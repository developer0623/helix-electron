import _ from 'lodash';
import Lab from '../../../app/models/lab';
import Entity from '../../../app/models/entity';
import Repository from '../../../app/models/repository';

const OWNER_TYPE = 'lab';

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
const LabMembersController = {
  CreateLabMember: (req, res, next) => {
    const email_address = req.body.email_address;

    Repository.findById(req.params.repository)
    .then((repository) => {
      if(!repository) { return next(new Error("Repository not found")); }

      const entity = new Entity();

      entity.name = req.body.name;
      entity.type = req.body.type;
      entity.say_as = req.body.say_as;
      entity.synonyms = req.body.synonyms || [];
      entity.attributes = req.body.attributes;
      entity.owner = req.params.company_id;
      entity.repository = req.params.repository_id;

      repository.save()
      .then(() => {
        lab.lab_members.push(labMember);

        lab.save()
        .then(() => {
          return res.status(201).json(labMember);
        })
        .catch((err) => {
          LabMember.findByIdAndRemove(labMember._id).exec();

          return next(err);
        })
      })
      .catch((err) => {
        return next(err);
      })
    })
    .catch((err) => {
      return next(err);
    });
  },
  CreateRepository: (req, res, next) => {
    getLab(req.params.lab_id)
    .then((lab) => {
      if(!lab) { return res.sendStatus(404); }

      const repository = new Repository();

      repository.name = req.body.name;
      repository.repository_type = req.body.repository_type;
      repository.data_set_type = req.body.data_set_type || "Custom";
      repository.entity_type = req.body.entity_type;
      repository.owner_type = OWNER_TYPE;
      repository.owner = lab;
      repository.attributes = {};

      repository.save((err) => {
        if(err) { return next(err); }

        lab.lab_members.push(repository);
        lab.save()
        .then(() => {
          res.status(201).json(repository);
        })
        .catch((err) => {

          reject(err);
        });
      });
    });
  }
}

module.exports = LabMembersController;
