import NoteIntentHandler  from '../../plugins/notes/note.intent_handler';
import AlexaResponseHandler from '../../managers/alexa.response_handler';

import _ from 'lodash';

function getSlotValue(slots, slotName) {
  const entitySlot = slots[slotName];

  if(!entitySlot) { return null; }

  const resolvedValues = entitySlot.resolvedValues();

  if(!_.isEmpty(resolvedValues)) {
    return resolvedValues[0];
  } else {
    return entitySlot.value;
  }
}
const AlexaNoteController = {
  GetTakeNoteResponse: (req, res) => {
    return new Promise((resolve, reject) => {
      const userId = req.data.session.user.userId;
      const slots = [];

      slots.push({
        key: "Note",
        value: getSlotValue(req.slots, "Note")
      });
      const intentHandler = new NoteIntentHandler(req.application, req.user, userId, slots);

      intentHandler.fulfillIntent((err, response) => {
        if(err) { return reject(err); }

        response.intentName = "NoteIntent";
        const alexaResponseHandler = new AlexaResponseHandler(response);

        resolve(alexaResponseHandler.handleResponse(req, res));
      });
    });
  }
}

module.exports = AlexaNoteController;
