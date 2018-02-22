import LaboratoryProfile from'../../models/laboratory_profile';
import queues from '../../../lib/queues';
import config from'../../../src/config';
import generator from 'generate-password';

const LaboratoryProfilesController = {
  CreateLaboratoryProfile: (req, res, next) => {
    const laboratory_profile = new LaboratoryProfile({
      profile_name: req.body.profile_name,
      street_address_1: req.body.street_address_1,
      street_address_2: req.body.street_address_2,
      city: req.body.city,
      state: req.body.state,
      zip_code: req.body.zip_code,
      timezone: req.body.timezone,
      owner: req.params.company_id
    });

    laboratory_profile.save(function(err) {
      if (err) { return next(err); }

      res.status(201).json(laboratory_profile);
    });
  },
  UpdateLaboratoryProfile: (req, res, next) => {
    LaboratoryProfile.findById(req.params.laboratory_profile_id, (err, laboratory_profile) => {
      if(err) { return next(err); }
      if(!laboratory_profile) { return res.sendStatus(404); }

      laboratory_profile.profile_name = req.body.profile_name;
      laboratory_profile.street_address_1 = req.body.street_address_1,
      laboratory_profile.street_address_2 = req.body.street_address_2,
      laboratory_profile.city = req.body.city,
      laboratory_profile.state = req.body.state,
      laboratory_profile.zip_code = req.body.zip_code,
      laboratory_profile.timezone = req.body.timezone,

      laboratory_profile.save((err) => {
        if(err) { return next(err); }

        res.status(200).json(laboratory_profile);
      });
    });
  },
  GetLaboratoryProfiles: (req, res, next) => {
    LaboratoryProfile.find({ owner: req.params.company_id }, (err, laboratory_profiles) => {
      if (err) { return next(err); }

      return res.json(laboratory_profiles);
    });
  },
  GetLaboratoryProfile: (req, res, next) => {
    LaboratoryProfile.findById(req.params.laboratory_profile_id, (err, laboratory_profile) => {
      if (err) { return next(err); }

      res.status(200).json(laboratory_profile);
    });
  },
  DeleteLaboratoryProfile: (req, res, next) => {
    LaboratoryProfile.findByIdAndRemove({ _id: req.params.laboratory_profile_id }, (err) => {
      if(err) { return next(err); }

      res.sendStatus(204);
    })
  },
};

module.exports = LaboratoryProfilesController;
