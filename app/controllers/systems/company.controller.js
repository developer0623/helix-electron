import Company from '../../models/company';
import AlexaForBusinessService from '../../../services/aws/alexa_for_business_service';

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
      if(company.room_profile_arn) {
        AlexaForBusinessService.updateRoomProfile(company, "arn:aws:iam::180220190192:role/HelixAI")
      } else {
        AlexaForBusinessService.createRoomProfile(company, "arn:aws:iam::180220190192:role/HelixAI")
      }
    })
    .then(() => {
      if(company.skill_group_arn) {
        AlexaForBusiness.updateSkillGroup(company, "arn:aws:iam::180220190192:role/HelixAI");
      } else {
        AlexaForBusinessService.createSkillGroup(company, "arn:aws:iam::180220190192:role/HelixAI")
      }
    })
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
        if(company.room_profile_arn) {
          AlexaForBusinessService.updateRoomProfile(company, "arn:aws:iam::180220190192:role/HelixAI")
        } else {
          AlexaForBusinessService.createRoomProfile(company, "arn:aws:iam::180220190192:role/HelixAI")
        }
      })
      .then(() => {
        if(company.skill_group_arn) {
          AlexaForBusiness.updateSkillGroup(company, "arn:aws:iam::180220190192:role/HelixAI");
        } else {
          AlexaForBusinessService.createSkillGroup(company, "arn:aws:iam::180220190192:role/HelixAI")
        }
      })
      .then(() => {
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
    .then(() => {
      if(company.room_profile_arn) {
        AlexaForBusinessService.deleteRoomProfile(company, "arn:aws:iam::180220190192:role/HelixAI")
      } else {
        return res.sendStatus(204);
      }
    })
    .then((err) => {
      return res.sendStatus(204);
    })
    .catch((err) => {
      return next(err);
    });
  }
};

module.exports = CompanyController;
