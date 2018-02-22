import Application from '../../../app/models/application';
import Lab from '../../../app/models/lab';
import Repository from '../../../app/models/repository';
import RepositoryType from '../../../app/models/repository_type';
import queues from '../../../lib/queues';
import config from '../../../src/config';

const OWNER_TYPE = "Lab";
const DEFAULT_CATEGORY = "ORGANIZERS_AND_ASSISTANTS";
const DEFAULT_PRIVACY_URL = `${process.env.PRIVACY_POLICY_URL}`;
const DEFAULT_LOGO_LARGE = `${process.env.AWS_BUCKET_URL}/systems/logos/logo-large.png`;
const DEFAULT_LOGO_SMALL = `${process.env.AWS_BUCKET_URL}/systems/logos/logo-small.png`;

function getLab(labId) {
  return new Promise((resolve, reject) => {
    Lab.findById(labId)
    .then((lab) => {
      resolve(lab);
    })
    .catch((err) => {
      reject(err);
    })
  });
}
const ApplicationsController = {
  CreateApplication: (req, res, next) => {
    getLab(req.params.lab_id)
    .then((lab) => {
      if(!lab) { return res.sendStatus(404); }
      const defaultSummary = `This is a private voice application for the ${lab.lab_name} lab.`;
      const defaultTestingInstructions = 'This is a private skill and should not be certified';

      const application = new Application({
        name: req.body.name,
        application_type: "Custom",
        distribution_mode: req.body.distribution_mode || "PRIVATE",
        invocation_name: req.body.invocation_name,
        summary: req.body.summary || defaultSummary,
        description: req.body.description || defaultSummary,
        small_logo: req.body.small_logo || DEFAULT_LOGO_SMALL,
        large_logo: req.body.large_logo || DEFAULT_LOGO_LARGE,
        keywords: req.body.keywords || [],
        example_phrases: req.body.example_phrases || [],
        testing_instructions: req.body.testing_instructions || defaultTestingInstructions,
        category: DEFAULT_CATEGORY,
        endpoint: process.env.ALEXA_ENDPOINT_URI,
        private_policy_urL: req.body.private_policy_urL || DEFAULT_PRIVACY_URL,
        terms_of_service_url: req.body.terms_of_service_url || DEFAULT_PRIVACY_URL,
        active: true,
        owner_type: OWNER_TYPE,
        owner: req.params.lab_id
      });

      application.save((err) => {
        if (err) { return next(err); }

        lab.application = application;
        lab.save()
      })
      .then(() => {
        res.status(201).json(application);
      })
      .catch((err) => {
        next(err);
      });
    })
    .catch((err) => {
      next(err);
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
      application.testing_instructions = req.body.testing_instructions;
      application.category = DEFAULT_CATEGORY;
      application.endpoint = req.body.endpoint;
      application.active = true;
      application.training_repositories = req.body.training_repositories;

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

    const populate_paths = {};
    const params = {
      query: { owner: req.params.lab_id },
      paging: { page: page, limit: pageSize, sort: { name: 'desc' }, populate: populate_paths },
    };
    Application.paginate(params.query, params.paging, (err, result) => {
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
  GetAllApplications: (req, res, next) => {
    Application.find({
      owner: req.params.lab_id
    })
    .then((applications) =>{
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
    getLab(req.params.lab_id)
    .then((lab) => {
      if(!lab) { return res.sendStatus(404); }

      Application.findByIdAndRemove({ _id: req.params.application_id }, (err) => {
        if(err) { return next(err); }

        lab.application = null;
        lab.save()
        .then(() => {
          return res.sendStatus(204);
        })
        .catch((err) => {
          return next(err);
        });
      });
    })
    .catch((err) => {
      return next(err);
    })
  }
};

module.exports = ApplicationsController;
