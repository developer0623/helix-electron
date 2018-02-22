import express from 'express';
import GoogleController from '../../app/controllers/google.controller';

let router = express.Router();

router.route('/webhook')
  .post(GoogleController.ProcessRequest);


module.exports = router;
