import User from'../../models/user';
import queues from '../../../lib/queues';
import config from'../../../src/config';
import generator from 'generate-password';

const UsersController = {
  CreateUser: (req, res, next) => {
    var user = new User({
      user_type: req.body.user_type,
      email_address: req.body.email_address,
      password: req.body.password || generator.generate({
        length: 8,
        numbers: true
      }),
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      mobile_number: req.body.mobile_number,
      company: req.params.company_id
    });

    user.save(function(err) {
      if (err) { return next(err); }

      res.status(201).json(user);
    });
  },
  UpdateUser: (req, res, next) => {
    User.findById(req.params.user_id, (err, user) => {
      if(err) { return next(err); }
      if(!user) { return res.sendStatus(404); }

      user.user_type = req.body.user_type;
      user.email_address = req.body.email_address;
      user.first_name = req.body.first_name;
      user.last_name = req.body.last_name;
      user.mobile_number = req.body.mobile_number;

      user.save((err) => {
        if(err) { return next(err); }

        res.status(200).json(user);
      });
    });
  },
  GetUsers: (req, res, next) => {
    User.find({ company: req.params.company_id }, (err, users) => {
      if (err) { return next(err); }

      return res.json(users);
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

      res.sendStatus(204);
    })
  },
};

module.exports = UsersController;
