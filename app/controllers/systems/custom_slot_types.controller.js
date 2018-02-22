import _ from 'lodash';
import CustomSlotType from '../../../app/models/custom_slot_type';

const CustomSlotTypesController = {
  GetCustomSlotType: (req, res, next) => {
    CustomSlotType.findById(req.params.custom_slot_type_id, (err, custom_slot_type) => {
      if(err) { return next(err); }
      if(!custom_slot_type) { return res.sendStatus(404); }

      res.status(200).json(custom_slot_type);
    });
  },
  GetCustomSlotTypes: (req, res, next) => {
    CustomSlotType.find({}, (err, custom_slot_types) => {
      if(err) { return next(err); }

      res.status(200).json(custom_slot_types);
    });
  },
  GetCustomSlotTypesPaged: (req, res, next) => {
    const pageSize = 10;
    const page = req.query.page || 1;
    const offset = (page - 1) * pageSize;

    let customSlotTypeName;
    if(req.query.name) {
      customSlotTypeName = req.query.name;
    }
    const params = {
      query: {},
      paging: { page: page, limit: pageSize, sort: { name: 'asc' } },
    };
    if(customSlotTypeName) {
      params.query.name = { "$regex": `${customSlotTypeName}`, "$options": "i" }
    }
    CustomSlotType.paginate(params.query, params.paging, (err, result) => {
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
  CreateCustomSlotType: (req, res, next) => {
    const custom_slot_type = new CustomSlotType();

    custom_slot_type.name = req.body.name;
    custom_slot_type.values = req.body.values;

    custom_slot_type.save((err) => {
      if(err) { return next(err); }

      res.status(201).json(custom_slot_type);
    });
  },
  UpdateCustomSlotType: (req, res, next) => {
    CustomSlotType.findById({ _id: req.params.custom_slot_type_id }, (err, custom_slot_type) => {
      if(err) { return next(err); }
      if(!custom_slot_type) { return res.sendStatus(404); }

      custom_slot_type.name = req.body.name;
      custom_slot_type.values = req.body.values;
      console.log(custom_slot_type);

      custom_slot_type.save((err) => {
        if(err) { return next(err); }

        res.status(200).json(custom_slot_type);
      });
    });
  },
  DeleteCustomSlotType: (req, res, next) => {
    CustomSlotType.findByIdAndRemove({ _id: req.params.custom_slot_type_id }, (err) => {
      if(err) { return next(err); }

      res.sendStatus(204);
    })
  }
}

module.exports = CustomSlotTypesController;
