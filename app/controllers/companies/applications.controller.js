import Application from '../../../app/models/application';
import Company from '../../../app/models/company';
import Repository from '../../../app/models/repository';
import RepositoryType from '../../../app/models/repository_type';
import queues from '../../../lib/queues';
import config from '../../../src/config';
import _ from 'lodash';

import PublishManager from '../../../app/managers/publish_manager';

const OWNER_TYPE = "Company";
const DEFAULT_CATEGORY = "ORGANIZERS_AND_ASSISTANTS";
const DEFAULT_PRIVACY_URL = `${process.env.PRIVACY_POLICY_URL}`;
const DEFAULT_LOGO_LARGE = `${process.env.AWS_BUCKET_URL}/systems/logos/logo-large.png`;
const DEFAULT_LOGO_SMALL = `${process.env.AWS_BUCKET_URL}/  systems/logos/logo-small.png`;

function getCompany(companyId) {
  return new Promise((resolve, reject) => {
    Company.findById(companyId)
    .then((company) => {
      resolve(company);
    })
    .catch((err) => {
      reject(err);
    })
  });
}
const ApplicationsController = {
  CreateApplication: (req, res, next) => {
    getCompany(req.params.company_id)
    .then((company) => {
      if(!company) { return res.sendStatus(404); }

      const defaultSummary = `This is a voice application built using HelixAI.`;

      const application = new Application({
        name: req.body.name,
        application_type: "Custom",
        distribution_mode: req.body.distribution_mode || "PUBLIC",
        invocation_name: req.body.invocation_name,
        summary: req.body.summary || defaultSummary,
        description: req.body.description || defaultSummary,
        small_logo: req.body.small_logo || DEFAULT_LOGO_SMALL,
        large_logo: req.body.large_logo || DEFAULT_LOGO_LARGE,
        keywords: req.body.keywords || [],
        example_phrases: req.body.example_phrases || [],
        testing_instructions: req.body.testing_instructions || defaultSummary,
        category: DEFAULT_CATEGORY,
        endpoint: process.env.ALEXA_ENDPOINT_URI,
        private_policy_urL: req.body.private_policy_urL || DEFAULT_PRIVACY_URL,
        terms_of_service_url: req.body.terms_of_service_url || DEFAULT_PRIVACY_URL,
        default_launch_prompt: req.body.default_launch_prompt,
        default_launch_reprompt: req.body.default_launch_reprompt,
        default_welcome_background: req.body.default_welcome_background,
        active: true,
        owner_type: OWNER_TYPE,
        owner: req.params.company_id
      });

      application.save()
      .then(() => {
        PublishManager.queueMessage({
          application_id: application._id
        }, queues.APPLICATION_QUEUE );

        return res.status(201).json(application);
      })
      .catch((err) => {
        return next(err);
      });
    })
    .catch((err) => {
      return next(err);
    });
  },
  UpdateApplication: (req, res, next) => {
    Application.findById({ _id: req.params.application_id }, (err, application) => {
      if(err) { return next(err); }
      if(!application) { return res.sendStatus(404); }

      // Here you can write fields which you want to edit from request
      const fieldsToEdit = [
        'name', 'invocation_name', 'summary', 'description', 'small_logo', 'large_logo', 'testing_instructions',
        'endpoint', 'default_launch_prompt', 'default_launch_reprompt', 'default_welcome_background',
        'languages'
      ];

      const newData = fieldsToEdit.reduce((acc, key) => {
        acc[key] = req.body[key]
        return acc;
      }, {});

      application = Object.assign(
        application,
        newData,
        // Here you can write some new values
        {
          application_type: 'Custom',
          keywords: req.body.keywords || [],
          example_phrases: req.body.example_phrases || [],
          category: 'ORGANIZERS_AND_ASSISTANTS',
          active: true
        }
      );

      application.save((err) => {
        if(err) { return next(err); }

        application.default_welcome_background = (application.default_welcome_background) ? `${process.env.AWS_BUCKET_URL}${application.default_welcome_background}` : null;

        PublishManager.queueMessage({
          application_id: application._id
        }, queues.APPLICATION_QUEUE );

        res.status(200).json(application);
      });
    });
  },
  GetApplications: (req, res, next) => {
    const pageSize = 10;
    const page = req.query.page || 1;
    const offset = (page - 1) * pageSize;

    const populate_paths = {};
    const params = {
      query: { owner: req.params.company_id },
      paging: { page: page, limit: pageSize, sort: { name: 'desc' }, populate: populate_paths },
    };
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
  GetAllApplications: (req, res, next) => {
    Application.find({
      owner: req.params.company_id
    })
    .then((applications) =>{
      _.each(applications, (application) => {
        application.default_welcome_background = (application.default_welcome_background) ? `${process.env.AWS_BUCKET_URL}${application.default_welcome_background}` : null;
      });
      return res.status(200).json(applications);
    })
    .catch((err) => {
      return next(err);
    })
  },
  GetApplication: (req, res, next) => {
    Application.findById(req.params.id, (err, application) => {
      if (err) { return next(err); }

      res.status(200).json(application);
    });
  },
  DeleteApplication: (req, res, next) => {
    getCompany(req.params.company_id)
    .then((company) => {
      if(!company) { return res.sendStatus(404); }

      Application.findByIdAndRemove({ _id: req.params.application_id })
      .then(() => {
        return res.sendStatus(204);
      })
      .catch((err) => {
        return next(err);
      });
    });
  }
};

module.exports = ApplicationsController;
