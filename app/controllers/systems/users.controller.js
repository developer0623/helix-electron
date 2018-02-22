import User from'../../models/user';
import queues from '../../../lib/queues';
import config from'../../../src/config';

const UsersController = {
  CreateUser: (req, res, next) => {
    var user = new User({
      user_type: req.body.user_type,
      email_address: req.body.email_address,
      password: req.body.password,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      mobile_number: req.body.mobile_number,
      company: req.body.company
    });

    user.save(function(err) {
      if (err) { return next(err); }

      res.status(201).json(user);
    });
  },
  UpdateUser: (req, res, next) => {
    User.findById({ _id: req.params.user_id }, (err, user) => {
      if(err) { return next(err); }
      if(!user) { return res.sendStatus(404); }

      user.user_type = req.body.user_type;
      user.email_address = req.body.email_address;
      user.first_name = req.body.first_name;
      user.last_name = req.body.last_name;
      user.mobile_number = req.body.mobile_number;
      user.company = req.body.company;

      user.save((err) => {
        if(err) { return next(err); }

        res.status(200).json(user);
      });
    });
  },
  GetUsers: (req, res, next) => {
    const pageSize = 10;
    const page = req.query.page || 1;
    const offset = (page - 1) * pageSize;

    let lastName;
    if(req.query.last_name) {
      lastName = req.query.last_name;
    }
    const populate_paths = {
      path: 'company',
      model: 'Company',
    };
    const params = {
      query: {},
      paging: { page: page, limit: pageSize, sort: { email_address: 'asc' }, populate: populate_paths },
    };
    if(lastName) {
      params.query.last_name = { "$regex": `${lastName}`, "$options": "i" }
    }
    User.paginate(params.query, params.paging, (err, result) => {
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
  GetUser: (req, res, next) => {
    User.findById(req.params.user_id, (err, user) => {
      if (err) { return next(err); }

      res.status(200).json(user);
    });
  },
  DeleteUser: (req, res, next) => {
    User.findByIdAndRemove({ _id: req.params.user_id }, (err) => {
      if(err) { return next(err); }
      if(!user) { return res.sendStatus(404); }

      res.sendStatus(204);
    })
  },
};

module.exports = UsersController;
