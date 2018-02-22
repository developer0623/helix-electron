import SkillGroup from'../../models/skill_group';
import queues from '../../../lib/queues';
import config from'../../../src/config';
import generator from 'generate-password';

const SkillGroupsController = {
  CreateSkillGroup: (req, res, next) => {
    const skill_group = new SkillGroup({
      skill_group_name: req.body.skill_group_name,
      description: req.body.description,
      owner: req.params.company_id
    });

    skill_group.save(function(err) {
      if (err) { return next(err); }

      res.status(201).json(skill_group);
    });
  },
  UpdateSkillGroup: (req, res, next) => {
    SkillGroup.findById(req.params.skill_group_id, (err, skill_group) => {
      if(err) { return next(err); }
      if(!skill_group) { return res.sendStatus(404); }

      skill_group.skill_group_name = req.body.skill_group_name;
      skill_group.description = req.body.description

      skill_group.save((err) => {
        if(err) { return next(err); }

        res.status(200).json(skill_group);
      });
    });
  },
  GetSkillGroups: (req, res, next) => {
    SkillGroup.find({ owner: req.params.company_id }, (err, skill_groups) => {
      if (err) { return next(err); }

      return res.json(skill_groups);
    });
  },
  GetSkillGroup: (req, res, next) => {
    SkillGroup.findById(req.params.skill_group_id, (err, skill_group) => {
      if (err) { return next(err); }

      res.status(200).json(skill_group);
    });
  },
  DeleteSkillGroup: (req, res, next) => {
    SkillGroup.findByIdAndRemove({ _id: req.params.skill_group_id }, (err) => {
      if(err) { return next(err); }

      res.sendStatus(204);
    })
  },
};

module.exports = SkillGroupsController;
