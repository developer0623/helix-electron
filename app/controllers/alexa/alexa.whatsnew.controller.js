import DeviceHelper from './device_helper';
import _ from 'lodash';

import util from "util";

import * as intentTypes from '../../models/types/intentTypes';
import * as contextStatusTypes from '../../models/types/userContextStatusTypes';
import * as contextTypes from '../../models/types/contextTypes';

import * as confirmationStatuses from './types/confirmationStatus';
import * as dialogStates from './types/dialogStates';

import WhatsNewIntentHandler  from '../../plugins/whats_new.intent_handler';
import AlexaResponseHandler from '../../managers/alexa.response_handler';

const states = {
  GET_WHATS_NEW: 'get_whats_new',
  CONFIRM_READ_ARTICLE: 'confirm_read_article'
}

function log(action) {
  console.log("What's New Controller: " + action)
}
function logError(error) {
  console.log("Error: " + error + ": " + error.stack);
}
function getContext(req, res) {
  return new Promise((resolve, reject) => {
    log("Getting Context");

    const userId = req.data.session.user.userId;
    const timeToExpire = new Date(+new Date() + 2+24+60*60*1000)

    UserContext.getContext(userId, contextTypes.WHATS_NEW)
    .then((userContext) => {
      if(!userContext) {
        userContext = new UserContext({
          context: {
            state: states.GET_WHATS_NEW
          },
          user_identifier: userId,
          type: contextTypes.WHATS_NEW,
          intent: intentTypes.WHATS_NEW,
          status: contextStatusTypes.IN_PROGRESS,
          time_to_expire: timeToExpire
        });

        resolve(userContext);
      } else {
        resolve(userContext);
      }
    })
    .catch((err) => {
      reject(err)
    });
  });
}
function saveContext(currentContext) {
  return new Promise((resolve, reject) => {
    log(`Updating Context`);

    currentContext.markModified('context');
    currentContext.save()
    .then(() => {
      resolve();
    })
    .catch((err) => {
      reject(err);
    });
  });
}
function setTemplateDirectives(req, res, displayText) {
  return new Promise((resolve, reject) => {
    log("Setting Template Directive");

    if(!DeviceHelper.supportsDisplay(req) && !DeviceHelper.isSumulator(req)) {
      return resolve([false]);
    }

    const directive = {
      "type": "Display.RenderTemplate",
      "template": {
        "type": "BodyTemplate2",
        "token": "1",
        "backButton": "HIDDEN",
        //"backgroundImage": "Image",
        "title": displayText.title,
        "image": {
          "contentDescription": "Chemical & Engineering News",
          "sources": [
            {
              "url":  "https://pbs.twimg.com/profile_images/723202338694004737/a2v0E0Mj.jpg"
            }
          ]
        },
        "textContent": {
          "primaryText":{
            "type": "RichText",
            "text": `<font size="4">${displayText.text}</font>`
          }
        }
      }
    };

    res.response.response.directives.push(directive)

    resolve([true]);
  })
}

function getJournalArticles(lab) {
  return new Promise((resolve, reject) => {
    LabJournalArticle.find({ lab: lab, offered: false })
    .populate('journal_article')
    .exec()
    .then((journalArticles) => {
      resolve(journalArticles);
    })
    .catch((err) => {
      reject(err);
    })
  });
}
function getWhatsNewPrompt(req, res, currentContext) {
  return new Promise((resolve, reject) => {
    log("Getting What's New Prompt");

    let prompt = '';
    // prompt += 'The new edition of Chemical and Engineering News is available today. ';
    // prompt += 'Would you like me to read the article titles?'

    // const confirmDirective = {
    //   "type": "Dialog.ConfirmIntent",
    // }
    //
    // res.response.response.directives.push(confirmDirective)
    prompt += "The ACS national meeting is happening August 22 - August 24th. "
    prompt += "To get more information about this year’s ACS national meeting, say ‘Tell me more about the ACS’."

    req.prompt = prompt;

    res.say(prompt)
      .shouldEndSession(true)

    // currentContext.context = {
    //   state: states.CONFIRM_READ_ARTICLE,
    // };
    saveContext(currentContext)
    .then(() => {
      resolve(res);
    })
    .catch((err) => {
      reject(err);
    });

    resolve(res);
  });
}
function getArticleTitlesPrompt(req, res) {
  return new Promise((resolve, reject) => {
    log("Getting Article Titles Prompt");

    let prompt = '';
    prompt += 'There is an article about Me!';
    prompt += '<break time="0.5s" />';
    prompt += ' The title of the article is ';
    prompt += '<break time="0.5s" />';
    prompt += ' Meet your new lab assistant.  I\'ll send your the link.';

    req.prompt = prompt;

    res.say(prompt)
      .shouldEndSession(true)

    resolve(res);
  });
}
function completeWhatsNew(req, res, currentContext) {
  return new Promise((resolve, reject) => {
    log("Complete Whats New");

    currentContext.status = contextStatusTypes.COMPLETED,

    saveContext(currentContext)
    .then(() => {
      res.say("Ok")
        .shouldEndSession(true)

      resolve(res);
    })
    .catch((err) => {
      reject(err);
    });
  });
}
const AlexaWhatsNewController = {
  GetWhatsNewResponse: (req, res) => {
    return new Promise((resolve, reject) => {
      const userId = req.data.session.user.userId;
      const intentHandler = new WhatsNewIntentHandler(req.application, req.user, userId, []);

      intentHandler.fulfillIntent((err, response) => {
        if(err) { return reject(err); }

        response.intentName = "WhatsNewIntent";
        const alexaResponseHandler = new AlexaResponseHandler(response);

        resolve(alexaResponseHandler.handleResponse(req, res));
      });
      // log("Getting What's New Response");
      //
      // let currentContext;
      //
      // getContext(req, res)
      // .then((context) => {
      //   currentContext = context;
      //   const state = currentContext.context && currentContext.context.state ? currentContext.context.state : states.GET_WHATS_NEW;
      //
      //   switch(state) {
      //     case states.CONFIRM_READ_ARTICLE:
      //       switch(req.confirmationStatus) {
      //         case confirmationStatuses.CONFIRMED:
      //         const displayText = {
      //           title: "Meet Your New Lab Assistant",
      //           text: "Imagine working on a multistep reaction that requires you to add reagents in a specific sequence and with precise timing. Standing at the hood, reagents measured and ready to go, you begin the carefully orchestrated procedure, when suddenly your mind draws a blank. Which reagent do you add next?"
      //         }
      //         setTemplateDirectives(req, res, displayText)
      //         .then((templateDirectiveResponse) => {
      //           return getArticleTitlesPrompt(req, res, currentContext);
      //         })
      //         .then((res) => {
      //           if(res) {
      //             res.send()
      //
      //             resolve(res);
      //           }
      //         })
      //         .catch((err) => {
      //           logError(err);
      //
      //           reject(err);
      //         });
      //         break;
      //         case confirmationStatuses.DENIED:
      //         completeWhatsNew(req, res, currentContext)
      //         .then((res) => {
      //           if(res) {
      //             res.send()
      //
      //             resolve(res);
      //           }
      //         })
      //         .catch((err) => {
      //           logError(err);
      //
      //           reject(err);
      //         });
      //         break;
      //         default:
      //         getWhatsNewPrompt(req, res, currentContext)
      //         .then((res) => {
      //           if(res) {
      //             res.send()
      //
      //             resolve(res);
      //           }
      //         })
      //         .catch((err) => {
      //           logError(err);
      //
      //           reject(err);
      //         });
      //         break
      //       }
      //
      //       break;
      //     default:
      //       getWhatsNewPrompt(req, res, currentContext)
      //       .then((res) => {
      //         if(res) {
      //           res.send()
      //
      //           resolve(res);
      //         }
      //       })
      //       .catch((err) => {
      //         logError(err);
      //
      //         reject(err);
      //       });
      //
      //       break;
      //   }
      // })
      // .catch((err) => {
      //   logError(err);
      //
      //   reject(err);
      // });
    });
  }
}

module.exports = AlexaWhatsNewController;
