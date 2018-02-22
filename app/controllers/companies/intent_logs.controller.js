import _ from 'lodash';
import IntentLog from '../../../app/models/intent_log';

const IntentLogsController = {
  GetIntentLog: (req, res, next) => {
    IntentLog.findById(req.params.intent_log_id)
    .exec()
    .then((intentLog) => {
      if(!intent_log) { return res.sendStatus(404); }

      res.status(200).json(intentLog);
    })
    .catch((err) => {
      next(err);
    });
  },
  GetIntentLogs: (req, res, next) => {
    const pageSize = 10;
    const page = req.query.page || 1;
    const offset = (page - 1) * pageSize;

    const params = {
      query: { application: req.params.application_id },
      paging: { page: page, limit: pageSize, sort: { createdAt: 'desc' }, populate: 'user' },
    };
    IntentLog.paginate(params.query, params.paging, (err, result) => {
      if (err) { return next(err); }

      return res.json({ results: result.docs,
        total: Number(result.total),
        limit: Number(result.limit),
        offset: Number(result.offset),
        current_page: Number(result.page),
        max_pages: Math.ceil(result.total / pageSize)
      });
    });
  }
}

module.exports = IntentLogsController;
