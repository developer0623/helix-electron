import MarketingLead from '../models/marketing_lead';
import queues from '../../lib/queues';
import config from '../../src/config';

import PublishManager from '../managers/publish_manager';

function saveMarketingLead(marketingLead) {
  return new Promise((resolve, reject) => {
    marketingLead.save()
    .then(() => {
      resolve(marketingLead);
    })
    .catch((err) => {
      reject(err);
    });
  });
}
const MarketingLeadController = {
  CreateMarketingLead: (req, res, next) => {
    var marketingLead = new MarketingLead();

    marketingLead.full_name = req.body.full_name;
    marketingLead.first_name = req.body.first_name;
    marketingLead.last_name = req.body.last_name;
    marketingLead.company_name = req.body.company_name;
    marketingLead.email_address = req.body.email_address;
    marketingLead.message = req.body.message;
    marketingLead.campaign = req.body.campaign;

    saveMarketingLead(marketingLead)
    .then((marketingLead) => {
      PublishManager.queueMessage({
        channel: "#websiteevents",
        username: "HelixBot",
        message: marketingLead.message
      }, queues.SLACK_QUEUE );

      PublishManager.queueMessage({
        marketing_lead_id: marketingLead._id
      }, queues.EMAIL_QUEUE );

      return res.status(201).json(marketingLead);
    })
    .catch((err) => {
      return next(err);
    });
  },
  UpdateMarketingLead: (req, res, next) => {
    MarketingLead.findById({ _id: req.params.marketing_lead_id })
    .then((marketingLead) => {
      marketingLead.full_name = req.body.full_name;
      marketingLead.first_name = req.body.first_name;
      marketingLead.last_name = req.body.last_name;
      marketingLead.company_name = req.body.company_name;
      marketingLead.email_address = req.body.email_address;
      marketingLead.message = req.body.message;
      marketingLead.campaign = req.body.campaign;

      saveMarketingLead(marketingLead)
      .then((marketingLead) => {
        return res.status(200).json(marketingLead);
      })
      .catch((err) => {
        return next(err);
      });
    })
    .catch((err) => {
      return res.status(404);
    });
  },
  GetMarketingLead: (req, res, next) => {
    MarketingLead.findById(req.params.marketing_lead_id)
    .then((marketingLead) => {
      res.sendStatus(200).json(marketingLead)
    })
    .catch((err) => {
      return next(err);
    });
  },
  GetMarketingLeads: (req, res, next) => {
    const pageSize = 10;
    const page = req.query.page || 1;
    const offset = (page - 1) * pageSize;

    const params = {
      query: {},
      paging: { page: page, limit: pageSize, sort: { createdAt: 'desc' } },
    };
    MarketingLead.paginate(params.query, params.paging, (err, result) => {
      if (err) { return next(err); }

      return res.json({ results: result.docs,
        total: Number(result.total),
        limit: Number(result.limit),
        offset: Number(result.offset),
        current_page: Number(result.page),
        max_pages: Math.ceil(result.total / pageSize)
      });
    });;
  },
  DeleteMarketingLead: (req, res, next) => {
    MarketingLead.findByIdAndRemove({ _id: req.params.marketing_lead_id })
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      return next(err);
    });
  }
};

module.exports = MarketingLeadController;
