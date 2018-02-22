import * as propertyTypes from '../../models/types/propertyTypes';
import * as intentTypes from '../../models/types/intentTypes';
import * as contextStatusTypes from '../../models/types/userContextStatusTypes';
import * as contextTypes from '../../models/types/contextTypes';

import Entity from '../../models/entity';

import _ from 'lodash';
import resolveToString from 'es6-template-strings/resolve-to-string';

import IntentBaseManager from '../intent_base.manager';
import IntentResponse from '../../managers/intent_response';

class NoteIntentHandler extends IntentBaseManager {
  constructor(application, user, userId, slots) {
    super(application, user, userId, intentTypes.RECORDNOTE, contextTypes.NOTE, slots);

    this.slotDefinitions.push({
      key: "Note",
      required: true,
      missingPrompt: "Ok, I\'ll start recording.",
      missingReprompt: "Just start saying what you want me to record.",
      invalidPrompt: "I'm sorry.  Can you try again?",
      invalidReprompt: "Try again."
    });
  }
  execute() {
    return new Promise((resolve, reject) => {
      console.log(`[Note IntentHandler] Saving Note`);

      if(!this.user) { return reject(new Error("Unknown User")); }

      const noteContent = this.getSlotValue("Note");
      const note = new Note();

      note.content = noteContent;
      note.user = this.user;

      note.save()
      .then((savedNote) => {
        resolve();
      })
      .catch((err) =>{
        reject(err);
      });
    });
  }
  getResponsePrompt() {
    return new Promise((resolve, reject) => {
      console.log(`[Note IntentHandler] Getting Response Prompt`);

      const prompt = 'Ok, got it.'

      const response = new IntentResponse();
      response.prompt = prompt;
      response.reprompt = null;
      response.slotName = null;
      response.clearIntent = false;
      response.shouldEndSession = true;

      return resolve(response);
    });
  }
};

export default NoteIntentHandler;
