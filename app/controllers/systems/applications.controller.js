import Application from '../../../app/models/application';
import queues from '../../../lib/queues';
import config from '../../../src/config';
import async from 'async';
import multer from 'multer';
import AWS from 'aws-sdk';
import sharp from 'sharp';
import uuidv1 from 'uuid/v1';

import PublishManager from '../../../app/managers/publish_manager';

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
const ApplicationsController = {
  CreateApplication: (req, res, next) => {
    var application = new Application({
      name: req.body.name,
      owner: req.body.owner,
      application_type: "Custom",
      invocation_name: req.body.invocation_name,
      summary: req.body.summary,
      description: req.body.description,
      small_logo: req.body.small_logo,
      large_logo: req.body.large_logo,
      keywords: req.body.keywords || [],
      example_phrases: req.body.example_phrases || [],
      modules: req.body.modules || [],
      platform_amazon: req.body.platform_amazon || true,
      platform_google: req.body.platform_google || false,
      alexa_directives: req.body.alexa_directives,
      languages: req.body.languages || [],
      testing_instructions: req.body.testing_instructions,
      access_control: req.body.access_control,
      distribution: req.body.distribution,
      privacy_policy_url: req.body.privacy_policy_url,
      terms_of_service_url: req.body.terms_of_service_url,
      category: "ORGANIZERS_AND_ASSISTANTS",
      endpoint: process.env.ALEXA_ENDPOINT_URI,
      active: true
    });

    application.save(function(err) {
      if (err) { return next(err); }

      console.log(`Application ${application._id} saved`);

      res.status(201).json(application);
    });
  },
  UpdateApplication: (req, res, next) => {
    Application.findById({ _id: req.params.application_id }, (err, application) => {
      if(err) { return next(err); }
      if(!application) { return res.sendStatus(404); }

      application.name = req.body.name;
      application.application_type = "Custom";
      application.invocation_name = req.body.invocation_name;
      application.summary = req.body.summary;
      application.description = req.body.description;
      application.small_logo = req.body.small_logo;
      application.large_logo = req.body.large_logo;
      application.keywords = req.body.keywords || [];
      application.example_phrases = req.body.example_phrases || [];
      application.platform_amazon = req.body.platform_amazon || false;
      application.platform_google = req.body.platform_google || false;
      application.alexa_directives = req.body.alexa_directives;
      application.languages= req.body.languages || [],
      application.testing_instructions = req.body.testing_instructions;
      application.category = "ORGANIZERS_AND_ASSISTANTS";
      application.access_control = req.body.access_control;
      application.distribution = req.body.distribution;
      application.privacy_policy_url = req.body.privacy_policy_url;
      application.terms_of_service_url = req.body.terms_of_service_url;
      application.endpoint = req.body.endpoint;
      application.active = true;

      application.save((err) => {
        if(err) { return next(err); }

        res.status(200).json(application);
      });
    });
  },
  GetApplications: (req, res, next) => {
    const pageSize = 10;
    const page = req.query.page || 1;
    const offset = (page - 1) * pageSize;

    let applicationName;
    if(req.query.name) {
      applicationName = req.query.name;
    }
    const params = {
      query: {},
      paging: { page: page, limit: pageSize, sort: { name: 'asc' }, populate: ['owner'] }
    };
    if(applicationName) {
      params.query.name = { "$regex": `${applicationName}`, "$options": "i" }
    }
    Application.paginate(params.query, params.paging, (err, result) => {
      if (err) { return next(err); }

      _.each(result.docs, (doc) => {
        doc.default_welcome_background = (doc.default_welcome_background) ? `${process.env.AWS_BUCKET_URL}${doc.default_welcome_background}` : null;
      });
      return res.json({ results: result.docs,
        total: Number(result.total),
        limit: Number(result.limit),
        offset: Number(result.offset),
        current_page: Number(result.page),
        max_pages: Math.ceil(result.total / pageSize)
      });
    });
  },
  GetApplication: (req, res, next) => {
    Application.findById(req.params.application_id, (err, application) => {
      if (err) { return next(err); }
      if(!application) { return res.sendStatus(404); }

      res.status(200).json(application);
    });
  },
  DeleteApplication: (req, res, next) => {
    Application.findByIdAndRemove({ _id: req.params.application_id }, (err) => {
      if(err) { return next(err); }

      PublishManager.queueMessage({
        application_id: req.params.application_id
      }, queues.APPLICATION_QUEUE );

      res.sendStatus(204);
    })
  },
  UploadLogo: (req, res, next) => {
    console.log("Upload Application Logo");

    const bucketname = `${process.env.AWS_BUCKET_NAME}/applications/${req.params.application_id}/logos`;
    const fileExtension = req.file.originalname.split('.').pop();

    async.parallel([
      (callback) => {
        const uuid = uuidv1();

        const filename = `large-logo.${fileExtension}`;
        const fileLocation = `${bucketname}/${filename}`

        resizeAndUploadLogo(req.file.buffer, bucketname, filename, 512, 512)
        .then(() => {
          callback();
        })
        .catch((err) => {
          callback(err);
        });
      },
      (callback) => {
        const filename = `small-logo.${fileExtension}`;
        const fileLocation = `${bucketname}/${filename}`

        resizeAndUploadLogo(req.file.buffer, bucketname, filename, 108, 108)
        .then(() => {
          callback();
        })
        .catch((err) => {
          callback(err);
        });
      }], (err, results) => {
        if(err) { return res.status(400).send(err); }
        console.log("Uploaded Logos");

        res.send('File uploaded to S3');
      });
    },
    UploadWelcomeBackground: (req, res, next) => {
      console.log("Upload Application Welcome Background");

      const bucketname = `${process.env.AWS_BUCKET_NAME}/applications/${req.params.application_id}/backgrounds`;
      const fileExtension = req.file.originalname.split('.').pop();
      const uuid = uuidv1();

      const filename = `welcome-background-${uuid}.${fileExtension}`;
      const fileLocation = `${process.env.AWS_BUCKET_URL}/applications/${req.params.application_id}/backgrounds/${filename}`;

      resizeAndUploadLogo(req.file.buffer, bucketname, filename, 1024, 600)
      .then(() => {
        return res.status(200).send({
          file_name: `/applications/${req.params.application_id}/backgrounds/${filename}`,
          file_location: fileLocation
        })
      })
      .catch((err) => {
        return res.status(400).send(err);
      });
    }
};

module.exports = ApplicationsController;
