import _ from 'lodash';
import Intent from '../../../app/models/intent';

const IntentsController = {
  GetIntent: (req, res, next) => {
    Intent.findById(req.params.intent_id, (err, intent) => {
      if(err) { return next(err); }
      if(!intent) { return res.sendStatus(404); }

      res.status(200).json(intent);
    });
  },
  GetIntents: (req, res, next) => {
    Intent.find({}, (err, intent) => {
      if(err) { return next(err); }
      if(!intent) { return res.sendStatus(404); }

      res.status(200).json(intent);
    });
  },
  GetIntentsPaged: (req, res, next) => {
    const pageSize = 10;
    const page = req.query.page || 1;
    const offset = (page - 1) * pageSize;

    let intentName;
    if(req.query.name) {
      intentName = req.query.name;
    }
    const populate_paths = {
      path: 'slots.custom_slot_type',
      model: 'CustomSlotType',
    };
    const params = {
      query: {},
      paging: { page: page, limit: pageSize, sort: { name: 'asc' }, populate: populate_paths },
    };
    if(intentName) {
      params.query.name = { "$regex": `${intentName}`, "$options": "i" }
    }
    Intent.paginate(params.query, params.paging, (err, result) => {
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
  CreateIntent: (req, res, next) => {
    const intent = new Intent();

    intent.name = req.body.name;
    intent.is_built_in = req.body.is_built_in;
    intent.samples = req.body.samples;
    intent.slots = req.body.slots;

    intent.save((err) => {
      if(err) { return next(err); }

      res.status(201).json(intent);
    });
  },
  UpdateIntent: (req, res, next) => {
    Intent.findById({ _id: req.params.intent_id }, (err, intent) => {
      if(err) { return next(err); }
      if(!intent) { return res.sendStatus(404); }

      intent.name = req.body.name;
      intent.is_built_in = req.body.is_built_in;
      intent.samples = req.body.samples;
      intent.slots = req.body.slots;

      intent.save((err) => {
        if(err) { return next(err); }

        res.status(200).json(intent);
      });
    });
  },
  DeleteIntent: (req, res, next) => {
    Intent.findByIdAndRemove({ _id: req.params.intent_id }, (err) => {
      if(err) { return next(err); }

      res.sendStatus(204);
    })
  }
}

module.exports = IntentsController;
