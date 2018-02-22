import _ from 'lodash';
import async from 'async';

import AlexaController from '../../app/controllers/alexa.controller';

import AlexaLaunchController from '../../app/controllers/alexa/alexa.launch.controller';
import AlexaRecipeController from '../../app/controllers/alexa/alexa.recipe.controller';
import AlexaProtocolController from '../../app/controllers/alexa/alexa.protocol.controller';
import AlexaCalculationController from '../../app/controllers/alexa/alexa.calculation.controller';
import AlexaMassMolarityCalculatorController from '../../app/controllers/alexa/alexa.massmolaritycalculator.controller';
import AlexaLookupController from '../../app/controllers/alexa/alexa.lookup.controller';
import AlexaSequenceController from '../../app/controllers/alexa/alexa.sequence.controller';
import AlexaWhatsNewController from '../../app/controllers/alexa/alexa.whatsnew.controller';
import AlexaIntroductionController from '../../app/controllers/alexa/alexa.introduction.controller';
import AlexaThanksController from '../../app/controllers/alexa/alexa.thanks.controller';
import AlexaNoteTakerController from '../../app/controllers/alexa/alexa.note_taker.controller';
import AlexaPageController from '../../app/controllers/alexa/alexa.page.controller';
import AlexaAbstractController from '../../app/controllers/alexa/alexa.abstract.controller';
import AlexaCancelController from '../../app/controllers/alexa/alexa.cancel.controller';
import AlexaStopController from '../../app/controllers/alexa/alexa.stop.controller';
import AlexaHelpController from '../../app/controllers/alexa/alexa.help.controller';
import AlexaInventoryController from '../../app/controllers/alexa/alexa.inventory.controller';
import AlexaVideoController from '../../app/controllers/alexa/alexa.video.controller';
import AlexaQuoteController from '../../app/controllers/alexa/alexa.quote.controller';
import AlexaOrderController from '../../app/controllers/alexa/alexa.order.controller';
import AlexaJokeController from '../../app/controllers/alexa/alexa.joke.controller';
import AlexaResetController from '../../app/controllers/alexa/alexa.reset.controller';
import AlexaWhoAmIController from '../../app/controllers/alexa/alexa.whoami.controller';

import Application from '../../app/models/application';
import UserContext from '../../app/models/user_context';
import IntentLog from '../../app/models/intent_log';
import Lab from '../../app/models/lab';
import OAuthToken from '../../app/models/oauth_token';

import * as propertyTypes from '../../app/models/types/propertyTypes';
import * as contextTypes from '../../app/models/types/contextTypes';

import Alexa from 'alexa-app';
import VoiceInsights from 'voice-insights-sdk';

const alexaApp = new Alexa.app('helix');
const VI_APP_TOKEN = 'e33f1610-0aaa-11a7-2aa4-0e61e4c2ee12';

function track(request, prompt) {
  return new Promise((resolve, reject) => {
    VoiceInsights.initialize(request.data.session, VI_APP_TOKEN);

    if(!request.data.request.intent) {
      resolve();
    }
    VoiceInsights.track(request.data.request.intent.name, request.data.request.intent.slots, prompt, (err, response) => {
      if(err) { console.log(err); }

      resolve();
    });
  })
}
function logRequest(request, response) {
  return new Promise((resolve, reject) => {
    const intentLog = new IntentLog();

    intentLog.user = request.user;
    intentLog.application = request.application;
    intentLog.type = request.data.request.type;
    if(request.data.request.intent) {
      intentLog.intent_name = request.data.request.intent.name;

      if(request.data.request.intent.slots) {
        const slots = request.data.request.intent.slots;

        _.each(Object.keys(slots), (key) => {
          intentLog.slots.push({
            key: slots[key].name,
            value: slots[key].value
          });
        });
      }
    }

    intentLog.application_id = request.data.session.application.applicationId;
    intentLog.session_id = request.data.session.sessionId;
    intentLog.request_id = request.data.request.requestId;
    intentLog.user_id = request.data.session.user.userId;
    intentLog.timestamp = request.data.request.timestamp;
    intentLog.locale = request.data.request.locale;
    intentLog.raw_request = request.data;

    intentLog.save()
    .then(() => {
      resolve(intentLog);
    })
    .catch((err) => {
      reject(err);
    });
  });
}
function getIntentHandler(intentName, context, user, application, slots) {
  switch(intentName) {
    default:
      return new LookuppIntentHandler(context, user, application, slots);
  }
}
alexaApp.pre = function(request, response, type) {
  return new Promise((resolve, reject) => {
    const session = request.getSession();
    const helixSessionId = session.get("HelixSessionID");

    const sessionId = request.data.session.sessionId;
    const accessToken = request.data.session.user.accessToken;
    const userId = request.data.session.user.userId;
    const applicationId = request.data.session.application.applicationId;

    let intent = null;
    if(request.data.request.intent) {
      intent = request.data.request.intent.name;
    } else {
      intent = request.data.request.type;
    }
    async.series([
      (callback) => {
        Application.findOne({ external_reference_id: applicationId})
        .then((application) => {
          if(!application) { return callback(new Error(`Application ${applicationId} not found`)); }

          request.application = application;;

          callback();
        })
        .catch((err) => {
          callback(err);
        })
      },
      (callback) => {
        if(!accessToken) {
          callback();
        } else {
          OAuthToken.getUser(accessToken)
          .then((user) => {
            //if(!user) { return callback(new Error(`Invalid User`)); }

            request.user = user;

            callback();
          })
          .catch((err) => {
            callback(err);
          });
        }
      },
      (callback) => {
        Lab.getLab(request.user)
        .then((lab) => {
          request.lab = lab;

          callback();
        })
        .catch((err) => {
          callback(err);
        });
      },
      (callback) => {
        logRequest(request, response)
        .then((intentLog) => {
          request.intentLog = intentLog;

          callback();
        })
        .catch((err) => {
          callback(err);
        });
      }
    ], (err, results) => {
      if(err) {
        reject(err);
      }

      resolve();
    });
  });
};
alexaApp.post = function(request, response, type, exception) {
  return new Promise((resolve, reject) => {
    if (exception) {
      const intentLog = request.intentLog;

      let prompt;

      console.log("Exception: " + exception);
      console.log(exception.stack);

      if (process.env.NODE_ENV === 'production') {
        prompt = "I'm sorry, I didn't quite understand.  Can you try again";
      } else {
        prompt = "An error occured: " + exception;
      }

      async.series([
        (callback) => {
          if(intentLog) {
            intentLog.raw_response = response;
            intentLog.prompt = prompt;
            intentLog.success = false;

            intentLog.save()
            .then(() => {
              callback();
            })
            .catch((err) => {
              callback(err);
            });
          } else {
            callback();
          }
        },
        (callback) => {
          track(request, prompt)
          .then(() => {
            callback();
          })
          .catch((err) => {
            callback(err);
          });
        }
      ], (results, err) => {
        response.clear()
          .shouldEndSession(false)
          .say(prompt)
          .send();

        resolve(response);
      });
    } else {
      const intentLog = request.intentLog;
      const prompt = request.prompt;
      const reprompt = request.reprompt;

      let intent = null;
      if(request.data.request.intent) {
        intent = request.data.request.intent.name;
      } else {
        intent = request.data.request.type;
      }

      async.series([
        (callback) => {
          intentLog.raw_response = response;
          intentLog.prompt = prompt;
          intentLog.reprompt = reprompt;
          intentLog.success = true;

          intentLog.save()
          .then(() => {
            callback();
          })
          .catch((err) => {
            callback(err);
          });
        },
        (callback) => {
          track(request, prompt)
          .then(() => {
            callback();
          })
          .catch((err) => {
            callback(err);
          });
        }
      ], (err, results) => {
        if(err) {
          console.log("Big Error: " + err);

          reject(err);
        }

        resolve();
      });
    }
  });
};
alexaApp.messages.NO_INTENT_FOUND = "Hmm, I'm not sure about that.";
// alexaApp.error = function(exception, request, response) {
//   response.say("Sorry, something bad happened. ");
// };
alexaApp.sessionEnded((request, response) => {
  //logout(request.userId);
});
alexaApp.launch(AlexaLaunchController.GetLaunchResponse);
alexaApp.intent('AMAZON.StopIntent', {
  "slots": {},
  "utterances": []
}, AlexaStopController.GetStopResponse);
alexaApp.intent('AMAZON.HelpIntent', {
  "slots": {},
  "utterances": []
}, AlexaHelpController.GetHelpResponse);
alexaApp.intent('AMAZON.CancelIntent', {
  "slots": {},
  "utterances": []
}, AlexaCancelController.GetCancelResponse);
alexaApp.intent('AMAZON.RepeatIntent', {
  "slots": {},
  "utterances": []
}, AlexaSequenceController.GetRepeatResponse);
alexaApp.intent('AMAZON.NextIntent', {
  "slots": {},
  "utterances": []
}, AlexaSequenceController.GetNextResponse);
alexaApp.intent('AMAZON.PreviousIntent', {
  "slots": {},
  "utterances": []
}, AlexaSequenceController.GetPreviousResponse);
alexaApp.intent('DoYouUnderstandIntent', {
  'slots': {
     'Entity': 'ENTITY',
   },
   'utterances': [
     'Do you understand {Entity}'
   ]
}, AlexaController.GetLookupResponse);
alexaApp.intent('WhatsNewIntent', {
   'utterances': [
     'What\'s new Helix'
   ]
 }, AlexaWhatsNewController.GetWhatsNewResponse);
alexaApp.intent('RecipeIntent', {
 'slots': {
    'RecipeName': 'AMAZON.LITERAL'
  },
  'utterances': [
    'what is the recipe for {RecipeName}',
    'what is the recipe for a {RecipeName}',
    'how do I make a {RecipeName}'
  ]
}, AlexaRecipeController.GetRecipeResponse);
alexaApp.intent('InventoryItemLocationIntent', {
  'slots': {
    'ProductName': 'ENTITY'
  },
  'utterances': [
    'Where are some {ProductName}',
    'Where is {ProductName}',
    'What shelf is {ProductName} on'
  ]
}, AlexaInventoryController.GetInventoryItemLocation);
alexaApp.intent('InventoryLookupIntent', {
  'slots': {
    'Entity': 'ENTITY'
  },
  'utterances': [
    'Do we have any {Entity}'
  ]
}, AlexaInventoryController.GetNEBInventoryLookupResponse);
alexaApp.intent('InventoryCheckoutIntent', {
  'slots': {
    'Entity': 'ENTITY',
    'Name': 'AMAZON.US_FIRST_NAME'
  },
  'utterances': [
    '{Name} has the {Entity}',
    'Checkout {Entity}',
    '{Name} is using {Entity}',
    '{Name} checked out {Entity}',
    '{Name} is checking out {Entity}'
  ]
}, AlexaInventoryController.CheckoutInventoryItem);
alexaApp.intent('InventoryCheckinIntent', {
  'slots': {
    'Entity': 'ENTITY',
    'Name': 'AMAZON.US_FIRST_NAME'
  },
  'utterances': [
    '{Name} is checking in {Entity}',
    'I\'m checking in {Entity}',
    'Checking in {Entity}'
  ]
}, AlexaInventoryController.CheckInInventoryItem);
alexaApp.intent('InventoryAmountIntent', {
  'slots': {
    'Entity': 'ENTITY',
    'InventoryItemStatus': 'INVENTORYITEMSTATUS'
  },
  'utterances': [
    'We are {InventoryItemStatus} of {Entity}',
    'Update inventory amount to {InventoryItemStatus}',
    'We are getting {InventoryItemStatus} on {Entity}'
  ]
}, AlexaInventoryController.SetInventoryItemStatus);
alexaApp.intent('InventoryItemCheckoutStatusIntent', {
  'slots': {
    'ProductName': 'ENTITY'
  },
  'utterances': [
    'Tell me who last checked out {ProductName}',
    'Tell me who checked out {ProductName}',
    'Tell me who what {ProductName}',
    'Who has {ProductName}',
    'Who checked out {ProductName}',
    'Who last checked out {ProductName}'
  ]
}, AlexaInventoryController.GetInventoryItemCheckoutStatus);
alexaApp.intent('InventoryAmountSummaryIntent', {
  'slots': {},
  'utterances': [
    'Are there any inventory item notes',
    'Did I make any inventory item notes',
    'Did I have any inventory item notes'
  ]
}, AlexaInventoryController.GetInventoryAmountSummary);
alexaApp.intent('SubtractInventoryItemAmount', {
  'slots': {
    'Entity': 'ENTITY',
    'Amount': 'AMAZON.NUMBER',
    'Units': 'UNIT'
  },
  'utterances': [
    'Subtract {Amount} {Units} from {Entity}'
  ]
}, AlexaInventoryController.SubtractInventoryItemAmount);
alexaApp.intent('AddInventoryItemAmount', {
  'slots': {
    'Entity': 'ENTITY',
    'Amount': 'AMAZON.NUMBER',
    'Units': 'UNIT'
  },
  'utterances': [
    'Subtract {Amount} {Units} from {Entity}'
  ]
}, AlexaInventoryController.AddInventoryItemAmount);
alexaApp.intent('QuoteIntent', {
  'slots': {
    'ProductName': 'AMAZON.ENTITY'
  },
  'utterances': []
}, AlexaQuoteController.GetRequestQuoteResponse);
alexaApp.intent('OrderIntent', {
  'slots': {
    'ProductName': 'ENTITY'
  },
  'utterances': []
}, AlexaOrderController.GetOrderRequestResponse);
alexaApp.intent('OrderSummaryIntent', {
  'slots': {
    'ProductName': 'AMAZON.ENTITY'
  },
  'utterances': []
}, AlexaOrderController.GetOrderSummaryResponse);
alexaApp.intent('InventoryItemCASNumberIntent', {
  'dialog': {
    type: 'delegate'
  },
  'slots': {
    'ProductName': 'AMAZON.ENTITY'
  },
  'utterances': [
    'I want to know the CAS number of an item',
    'I want to know the Chemical Abstract Service number of an item',
    'I need help finding the CAS number of an item',
    'What is the CAS number of {ProductName}',
    'Can you tell me the CAS number of {ProductName}',
    'What is the Chemical Abstract Service number of {ProductName}'
  ]
}, AlexaInventoryController.GetInventoryItemCASNumber);
alexaApp.intent('PageIntent', {
  'slots': {
     'Name': 'AMAZON.US_FIRST_NAME',
   },
   'utterances': [
     'Tell {NAME} I need her help'
   ]
}, AlexaPageController.Page);
alexaApp.intent('ProtocolIntent', {
  'slots': {
     'Compound': 'PROTOCOL',
     'LookUp': 'AMAZON.LITERAL',
   },
   'utterances': [
     'What is the protocol for {PROTOCOL}'
   ]
}, AlexaProtocolController.GetProtocolResponse);
alexaApp.intent('ProtocolPropertyIntent', {
  'slots': {
     'ProtocolProperty': 'PROTOCOLPROPERTY'
   },
   'utterances': [
     'Which {ProtocolProperty} do I need',
     'What {ProtocolProperty} do I need'
   ]
}, AlexaProtocolController.GetProtocolPropertyResponse);
alexaApp.intent('CalculationIntent', {
  'slots': {
     'CalculationName': 'AMAZON.LITERAL'
   },
   'utterances': [
     'Calcalate {CalculationName} given {InputVariable}'
   ]
}, AlexaCalculationController.GetCalculationResponse);
alexaApp.intent('MassMolarityIntent', {
  'slots': {
     'CalculationName': 'AMAZON.LITERAL'
   },
   'utterances': [
     'Calcalate {CalculationName} given {InputVariable}'
   ]
}, AlexaMassMolarityCalculatorController.GetMassMolarityResponse);
alexaApp.intent('MassMolarityIntent', {
 'slots': {
    'Compound': 'COMPOUND',
    'Volume': 'AMAZON.LITERAL',
    'Unit': 'AMAZON.LITERAL',
    'Concentration': 'AMAZON.NUMBER'
  },
  'utterances': [
    'What mass of {Compound} do I need to make a {Three | Volume} {Liter | Unit} solution at a concentration of {Concentration | AMAZON.NUMBER}'
  ]
}, AlexaMassMolarityCalculatorController.GetMassMolarityResponse);
alexaApp.intent('VolumeMolarityIntent', {
 'slots': {
    'Compound': 'COMPOUND',
    'Mass': 'AMAZON.NUMBER',
    'Unit': 'AMAZON.LITERAL',
    'Concentration': 'AMAZON.NUMBER'
  },
  'utterances': [
    'What volume of {Compound} do i need to dissolve {Mass} {Unit} to a concentration of {Concentration}'
  ]
},  AlexaMassMolarityCalculatorController.GetMassMolarityResponse);
alexaApp.intent('ConcentrationMolarityIntent', {
 'slots': {
    'Compound': 'COMPOUND',
    'Mass': 'AMAZON.NUMBER',
    'Unit': 'AMAZON.LITERAL',
    'Volume': 'AMAZON.NUMBER'
  },
  'utterances': [
    'What is the concentration of solution of {Mass} {Unit} of {Compound} in  {Volume}'
  ]
},  AlexaMassMolarityCalculatorController.GetMassMolarityResponse);
alexaApp.intent('LookUpIntent', {
 'slots': {
    'Compound': 'COMPOUND',
    'LookUp': 'AMAZON.NUMBER',
  },
  'utterances': [
    'What is the {LookUp} of {Compound}'
  ]
}, AlexaLookupController.GetLookupResponse);
alexaApp.intent('RecordNoteIntent', {
 'slots': {
    'Note': 'CATCHALL'
  },
  'utterances': [
    'Record a Note {Note}'
  ]
}, AlexaNoteTakerController.GetTakeNoteResponse);
alexaApp.intent('RepeatIntent', {
   'utterances': [
     'Repeat Last Step',
     'Repeat Last',
     'What was that',
     'Where was I'
   ]
 }, AlexaSequenceController.GetRepeatResponse);
alexaApp.intent('PreviousStepIntent', {
   'utterances': [
     'Go Back',
     'Back Up',
     'Last Step'
   ]
 }, AlexaSequenceController.GetPreviousResponse);
alexaApp.intent('NextStepIntent', {
   'utterances': [
     'Next Step',
     'Continue Protocol',
     'Now What'
   ]
 }, AlexaSequenceController.GetNextResponse);
 alexaApp.intent('IntroductionIntent', {
    'utterances': [
      'Helix tell me about yourself',
      'Tell me about yourself',
      'Introduce yourself',
      'Helix introduce yourself'
    ]
  }, AlexaIntroductionController.GetIntroductionResponse);
  alexaApp.intent('JokeIntent', {
     'utterances': [
       'Do you know any good science jokes',
       'Tell us a science joke',
       'Tell me a science joke',
       'Do you know any good jokes',
       'Tell us a joke',
       'Tell me a joke'
     ]
   }, AlexaJokeController.GetJokeResponse);
   alexaApp.intent('WhoAmIIntent', {
      'utterances': [
        'Who am I',
        'What Lab am I'
      ]
    }, AlexaWhoAmIController.GetWhoAmIResponse);
   alexaApp.intent('ResetContextIntent', {
      'utterances': [
        'No let\'s start something else',
        'Start something else',
        'Start something new',
        'Start new',
        'Reset',
        'Restart',
        'Let\'s start something else'
      ]
    }, AlexaResetController.GetResetIntentResponse);
    alexaApp.intent('CompleteProtocolIntent', {
       'utterances': [
         'Complete Protocol'
       ]
     }, AlexaProtocolController.GetCompleteProtocolResponse);
 alexaApp.intent('ThanksIntent', {
    'utterances': [
      'Thanks',
      'Thank You',
      'Thanks You Helix',
      'Thanks Helix'
    ]
  }, AlexaThanksController.GetThanksResponse);
  alexaApp.intent('AbstractIntent', {
     'utterances': [
       'Find my abstracts',
       'Play my new abstracts',
       'Are there any journal articles available',
       'Do I have any new journal articles'
     ]
   }, AlexaAbstractController.GetAbstractResponse);
   alexaApp.intent('PlayVideoIntent', {
      'slots': {
        'Tag': 'TAG',
      },
      'utterances': [
        'Play my video',
      ]
    }, AlexaVideoController.GetPlaybackResponse);
   alexaApp.intent('AMAZON.PauseIntent', {
     "slots": {},
     "utterances": []
   }, AlexaAbstractController.PauseAbstract);
   alexaApp.intent('AMAZON.ResumeIntent', {
     "slots": {},
     "utterances": []
   }, AlexaAbstractController.ResumeAbstract);

alexaApp.intent('GetTemperatureIntent', {
    'utterances': [
      'What\'s the temperature',
      'What\'s the temperature for {ENTITY}'
    ]
  }, AlexaSequenceController.GetTemperatureResponse);
  alexaApp.intent('GetDurationIntent', {
    'utterances': [
      'What\'s the duration',
      'How long should I set this',
      'What\'s the duration for {ENTITY}'
    ]
  }, AlexaSequenceController.GetDurationResponse);

  alexaApp.intent('GetElementQuantity', {
  'slots': {
     'ENTITY': 'AMAZON.LITERAL',
   },
   'utterances': [
     'How much {Entity} should I use',
     'How much {Entity} was I supposed to use',
     'How much {Entity}',
     'How much of {Entity}'
   ]
  }, AlexaSequenceController.GetElementQuantityResponse);

module.exports = alexaApp;
