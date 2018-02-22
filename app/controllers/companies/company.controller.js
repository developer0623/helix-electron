import Company from '../../models/company';
import CompanyUser from '../../models/company_user';
import AlexaForBusinessService from '../../../services/aws/alexa_for_business_service';
import AlexaForBusinessOperationTypes  from '../../../services/aws/AlexaForBusinessOperationTypes';
import PublishManager from '../../managers/publish_manager';
import queues from '../../../lib/queues';
import multer from 'multer';
import AWS from 'aws-sdk';
import sharp from 'sharp';
import async from 'async';
import uuidv1 from 'uuid/v1';

// Amazon s3 config
const s3 = new AWS.S3();
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  subregion: 'us-east-1',
});

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 52428800 },
});

function resizeAndUploadLogo(buffer, bucketname, filename, width, height) {
  return new Promise((resolve, reject) =>{
    console.log(`Uploading ${filename}`);

    sharp(buffer)
    .resize(width, height)
    .toBuffer()
    .then((data) => {
      s3.putObject({
          Bucket: `${bucketname}`,
          Key: `${filename}`,
          Body: data,
          ACL: 'public-read', // your permisions
        }, (err) => {
          if (err) { reject(err); }

          resolve();
        });
    })
    .catch((err) => {
      reject(err);
    });
  });
}
const CompanyController = {
  CreateCompany: (req, res, next) => {
    var company = new Company();

    company.name = req.body.name;
    company.amazon_iam_role_arn = req.body.amazon_iam_role_arn;
    company.keywords = req.body.keywords || [];
    company.contact = req.body.contact;
    company.physical_address = req.body.physical_address;
    company.room_profile_name = req.body.room_profile_name;
    company.room_profile_address = req.body.room_profile_address;
    company.room_profile_timezone = req.body.room_profile_timezone;
    company.room_profile_arn = req.body.room_profile_arn;
    company.skill_group_name = req.body.skill_group_name;
    company.skill_group_description = req.body.skill_group_description;

    company.save()
    .then(() => {
      res.status(201).json(company);
    })
    .catch((err) => {
      next(err);
    });
  },
  UpdateCompany: (req, res, next) => {
    Company.findById({ _id: req.params.company_id }, (err, company) => {
      if(err) { return next(err); }
      if(!company) { return res.sendStatus(404); }

      company.name = req.body.name;
      company.amazon_oauth_token = req.body.amazon_oauth_token;
      company.amazon_iam_role_arn = req.body.amazon_iam_role_arn;
      company.keywords = req.body.keywords || [];
      company.contact = req.body.contact;
      company.physical_address = req.body.physical_address;
      company.room_profile_name = req.body.room_profile_name;
      company.room_profile_address = req.body.room_profile_address;
      company.room_profile_timezone = req.body.room_profile_timezone;
      company.room_profile_arn = req.body.room_profile_arn;
      company.skill_group_name = req.body.skill_group_name;
      company.skill_group_description = req.body.skill_group_description;
      company.logo = req.body.logo;
      company.onboarding_complete = req.body.onboarding_complete;

      company.save()
      .then(() => {
        company.logo = (company.logo) ? `${process.env.AWS_BUCKET_URL}${company.logo}` : null;

        res.status(200).json(company);
      })
      .catch((err) => {
        next(err);
      });
    });
  },
  GetCompany: (req, res, next) => {
    Company.findById(req.params.company_id)
    .then((company) => {
      company.logo = (company.logo) ? `${process.env.AWS_BUCKET_URL}${company.logo}` : null;

      res.status(200).json(company);
    })
    .catch((err) => {
      next(err);
    })
  },
  GetCompanies: (req, res, next) => {
    Company.find({})
    .then((companies) => {
      res.status(200).json(companies);
    })
    .catch((err) => {
      next(err);
    })
  },
  GetCompaniesPaged: (req, res, next) => {
    const pageSize = 10;
    const page = req.query.page || 1;
    const offset = (page - 1) * pageSize;
    let companyName;
    if(req.query.company_name) {
      companyName = req.query.company_name;
    }
    const params = {
      query: {},
      paging: { page: page, limit: pageSize, sort: { name: 'asc' } },
    };
    if(companyName) {
      params.query.name = { "$regex": `${companyName}`, "$options": "i" }
    }
    Company.paginate(params.query, params.paging, (err, result) => {
      if (err) { return next(err); }

      return res.json({ results: result.docs,
        total: Number(result.total),
        limit: Number(result.limit),
        offset: Number(result.offset),
        current_page: Number(result.page),
        max_pages: Math.ceil(result.total / pageSize)
      });
    });
  },
  DeleteCompany: (req, res, next) => {
    Company.findByIdAndRemove({ _id: req.params.company_id })
    .then((err) => {
      return res.sendStatus(204);
    })
    .catch((err) => {
      return next(err);
    });
  },
  UploadLogo: (req, res, next) => {
    console.log("Upload Company Logo");

    const bucketname = `${process.env.AWS_BUCKET_NAME}/companies/${req.params.company_id}/logos`;
    const fileExtension = req.file.originalname.split('.').pop();
    const uuid = uuidv1();

    const filename = `logo-${uuid}.${fileExtension}`;
    const fileLocation = `${process.env.AWS_BUCKET_URL}/companies/${req.params.company_id}/logos/${filename}`
    resizeAndUploadLogo(req.file.buffer, bucketname, filename, 300, 300)
    .then(() => {
      return res.status(200).send({
        file_name: `/companies/${req.params.company_id}/logos/${filename}`,
        file_location: fileLocation
      })
    })
    .catch((err) => {
      return res.status(400).send(err);
    });
  }
};

module.exports = CompanyController;
