import mongoose from 'mongoose';

import _ from 'lodash';
import Company from '../../../app/models/company';
import Lab from '../../../app/models/lab';
import AlexaForBusinessService from '../../../services/aws/alexa_for_business_service';

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
const LabsController = {
  GetLab: (req, res, next) => {
    Lab.findById(req.params.lab_id)
    .populate('lab_members')
    .populate('inventories')
    .populate('repositories')
    .populate('application')
    .exec((err, lab) => {
      if(err) { return next(err); }
      if(!lab) { return res.sendStatus(404); }

      res.status(200).json(lab);
    });
  },
  GetAllLabs: (req, res, next) => {
    Lab.find({
      owner: req.params.company_id
    })
    .populate('lab_members')
    .populate('inventories')
    .populate('repositories')
    .populate('application')
    .exec()
    .then((labs) => {
      return res.status(200).json(labs);
    })
    .catch((err) => {
      return next(err);
    })
  },
  GetLabs: (req, res, next) => {
    const pageSize = 10;
    const page = req.query.page || 1;
    const offset = (page - 1) * pageSize;

    const name = (req.query.name) ? req.query.name : null;
    const params = {
      query: { owner: req.params.company_id },
      paging: { page: page, limit: pageSize, sort: { name: 'asc' }, populate: ['lab_members'] }
    };

    if(name) {
      params.query.lab_name = { "$regex": `${name}`, "$options": "i" }
    }
    Lab.paginate(params.query, params.paging)
    .exec((err, result) => {
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
  CreateLab: (req, res, next) => {
    getCompany(req.params.company_id)
    .then((company) => {
      const lab = new Lab();

      lab.lab_name = req.body.lab_name;
      lab.description = req.body.description;
      lab.lab_members = req.body.lab_members || [];
      lab.keywords = req.body.keywords || [];
      lab.laboratory_profile = req.body.laboratory_profile,
      lab.skill_group = req.body.skill_group,
      lab.owner = req.params.company_id;
      lab.owner_type = "Company";

      return lab.save();
    })
    .then((savedLab) => {
      return res.status(201).json(savedLab);
    })
    .catch((err) => {
      return next(err);
    })
  },
  UpdateLab: (req, res, next) => {
    getCompany(req.params.company_id)
    .then((company) => {
      Lab.findById(req.params.lab_id)
      .then((lab) => {
        if(!lab) { return res.sendStatus(404); }

        lab.lab_name = req.body.lab_name;
        lab.description = req.body.description;
        lab.laboratory_profile = req.body.laboratory_profile,
        lab.skill_group = req.body.skill_group,
        lab.lab_members = req.body.lab_members | [];
        lab.keywords = req.body.keywords || [];

        return lab.save();
      })
      .then((savedLab) => {
        return res.status(200).json(savedLab);
      })
      .catch((err) => {
        next(err);
      });
    })
    .catch((err) => {
      return next(err);
    })
  },
  DeleteLab: (req, res, next) => {
    getCompany(req.params.company_id)
    .then((company) => {
      if(!company) { return res.sendStatus(404); }

      let lab;

      Lab.findById(req.params.lab_id)
      .then((result) => {
        if(!result) { return res.sendStatus(204); }

        lab = result;

        lab.remove();
      })
      .then(() => {
        if(lab.aws_room_arn) {
          return AlexaForBusinessService.deleteRoom(lab, "arn:aws:iam::180220190192:role/HelixAI");
        } else {
          return res.sendStatus(204);
        }
      })
      .then(() => {
        return res.sendStatus(204);
      })
      .catch((err) => {
        next(err);
      });
    })
    .catch((err) => {
      next(err);
    });
  }
};

module.exports = LabsController;
