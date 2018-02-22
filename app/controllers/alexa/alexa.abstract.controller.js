import _ from 'lodash';

import * as intentTypes from '../../models/types/intentTypes';
import * as contextStatusTypes from '../../models/types/userContextStatusTypes';
import * as contextTypes from '../../models/types/contextTypes';

import * as confirmationStatuses from './types/confirmationStatus';
import * as dialogStates from './types/dialogStates';

import AbstractIntentHandler  from '../../plugins/abstract/abstract.intent_handler';
import AlexaResponseHandler from '../../managers/alexa.response_handler';

function log(action) {
  console.log("Abstract Controller: " + action)
}

const AlexaAbstractController = {
  GetAbstractResponse: (req, res) => {
    return new Promise((resolve, reject) => {
      const userId = req.data.session.user.userId;
      const intentConfirmation = req.confirmationStatus == confirmationStatuses.CONFIRMED;
      const dialog = req.getDialog();

      const intentHandler = new AbstractIntentHandler(req.application, req.user, userId, intentConfirmation, dialog.isStarted(), dialog.isInProgress(), dialog.isCompleted(), []);

      intentHandler.fulfillIntent((err, response) => {
        if(err) { return reject(err); }

        response.intentName = "AbstractIntent";
        const alexaResponseHandler = new AlexaResponseHandler(response);

        resolve(alexaResponseHandler.handleResponse(req, res));
      });
    });
  },
  PauseAbstract: (req, res) => {
    return new Promise((resolve, reject) => {
      res.shouldEndSession(false)
        .audioPlayerStop()
        .send();

        resolve(res);
    });
  },
  ResumeAbstract: (req, res) => {
    const abstractUrl = `${process.env.AWS_BUCKET_URL}/0378-1097(94)90212-7.mp3`;
    const stream = {
       "url": abstractUrl,
       "token": abstractUrl,
       "offsetInMilliseconds": 0
     };

    res.audioPlayerPlayStream("REPLACE_ALL", stream)
    .send()
    .then((response) => {
      resolve(response);
    })
    .catch((err) => {
      reject(err);
    });
  }
}

module.exports = AlexaAbstractController;
