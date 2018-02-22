import User from '../models/user';
import Link from '../models/link';

import moment from 'moment';

import * as linkTypes from '../models/types/linkTypes';
import * as emailTypes from '../models/types/emailTypes';

import PublishManager from '../managers/publish_manager';
import queues from '../../lib/queues';
import config from '../../src/config';

const ForgotPasswordController = {
  CreateResetPasswordLink: (req, res, next) => {
    const link = new Link();

    User.findOne({ email_address: req.body.email_address })
    .then((user) => {
      if(!user) { return res.send(400); }

      const url = `${config.hostname}/admin/reset_password/${link._id}` ;

      link.link_type =linkTypes.RESET_PASSWORD_LINK;
      link.sent_to = req.body.email_address;
      link.url = url;
      link.expiration_date = moment().add(3, 'days');
      link.opened = false;
      link.expired = false;
      link.user = user;

      return link.save();
    })
    .then(() => {

      PublishManager.queueMessage({
        email_type: emailTypes.RESET_PASSWORD_LINK_EMAIL,
        link_id: link._id
      }, queues.EMAIL_QUEUE );

      return res.sendStatus(200);
    })
    .catch((err) => {
      return next(err);
    });
  },
  ResetPassword: (err, req, res, next) => {
    Link.findById(req.params.link_id)
    .then((link) => {
      if(!link || link.isExpired ){
        return next(err);
      }
      return User.findById(link.user);
    })
    .then((user) => {

      if(!user) {
        return next(err);
      }

      user.password = req.body.password;

      return user.save();
    })
    .then(() => {
      return Link.update({ _id: req.params.link_id }, { expired: true });
    })
    .then(() => {
      // PublishManager.queueMessage({
      //   email_type: emailTypes.RESET_PASSWORD_LINK_EMAIL,
      //   link_id: link._id
      // }, queues.EMAIL_QUEUE );

      return res.sendStatus(200);
    })
    .catch((err) => {
      return next(err);
    })
  }
};

module.exports = ForgotPasswordController;
