import System from '../../models/system';
import _ from 'lodash';

const SystemAttributeController = {
  SaveAttribute: (req, res, next) => {
    const system_id = process.env.SYSTEM_ID;

    System.findById(system_id)
    .then((system) => {
      if(!system) { return res.sendStatus(404); }

      let attribute = _.find(system.attributes, { key: req.body.attribute_name });

      if(!attribute) {
        attribute = {
          key: req.body.attribute_name
        }
        system.attributes.push(attribute);
      }
      attribute.value = req.body.attribute_value;

      console.log(JSON.stringify(system));
      system.save((err) => {
        if(err) { return next(err); }

        res.status(200).json(system.attributes);
      });
    })
    .catch((err) => {
      next(err)
    });
  }
}

module.exports = SystemAttributeController;
