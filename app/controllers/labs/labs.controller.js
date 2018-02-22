import mongoose from 'mongoose';

import _ from 'lodash';
import User from '../../../app/models/user';
import Lab from '../../../app/models/lab';
import AlexaForBusinessService from '../../../services/aws/alexa_for_business_service';

function getUser(userId) {
  return new Promise((resolve, reject) => {
    User.findById(userId)
    .then((user) => {
      resolve(user);
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
      owner: req.user
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
      query: { owner: req.user },
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
    const lab = new Lab();
    const user = req.user;

    if(!user) { return res.sendStatus(404); }

    lab.lab_name = req.body.lab_name;
    lab.description = req.body.description;
    lab.keywords = req.body.keywords || [];
    lab.owner_type = "User";
    lab.owner = mongoose.Types.ObjectId(user._id);

    lab.save((err) => {
      if(err) { return next(err); }

      user.lab = lab;

      return user.save();
    })
    .then(() => {
      return res.status(201).json(lab);
    })
    .catch((err) => {
      return next(err);
    });
  },
  UpdateLab: (req, res, next) => {
    Lab.findById(req.params.lab_id)
    .then((lab) => {
      if(!lab) { return res.sendStatus(404); }

      lab.lab_name = req.body.lab_name;
      lab.description = req.body.description;
      lab.keywords = req.body.keywords || [];

      lab.save((err) => {
        if(err) { return next(err); }

        if(lab.aws_room_arn) {
          AlexaForBusinessService.updateRoom(lab, "arn:aws:iam::180220190192:role/HelixAI");
        } else {
          AlexaForBusinessService.createRoom(lab, "arn:aws:iam::180220190192:role/HelixAI");
        }
      })
      .then(() => {
        return res.status(200).json(lab);
      })
      .catch((err) => {
        next(err);
      });
    })
    .catch((err) => {
      next(err);
    });
  },
  DeleteLab: (req, res, next) => {
    const user = req.user;

    if(!user) { return res.sendStatus(404); }

    Lab.findByIdAndRemove({ _id: req.params.lab_id }, (err) => {
      if(err) { return next(err); }

      user.lab = null;
      user.save()
      .then(() => {
        return res.sendStatus(204);
      })
      .catch((err) => {
        reject(err);
      });
    });
  }
};

module.exports = LabsController;
