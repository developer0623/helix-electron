import _ from 'lodash';

function doesSupportDisplay(req) {
  var hasDisplay =
    req.data &&
    req.data.context &&
    req.data.context.System &&
    req.data.context.System.device &&
    req.data.context.System.device.supportedInterfaces &&
    req.data.context.System.device.supportedInterfaces.Display

  return hasDisplay;
}
function isSumulator(req) {
  const isSimulator = !req.context; //simulator doesn't send context

  return isSimulator;
}
const defaults = {
  intentName: "UnspecifiedIntent",
  prompt: null,
  reprompt: null,
  confirmIntent: false,
  shouldEndSession: false,
  elicitSlot: null,
  hintText: null,
  bodyTemplate: null,
  listTemplate: null,
  audio: null,
  video: null
}
class AlexaResponseHandler {
  constructor(options) {
    this.intentName = options.intentName || defaults.intentName;
    this.prompt = options.prompt || defaults.prompt;
    this.reprompt = options.reprompt || defaults.reprompt;
    this.confirmIntent = options.confirmIntent || defaults.confirmIntent;
    this.shouldEndSession = options.shouldEndSession || defaults.shouldEndSession;
    this.elicitSlot = options.elicitSlot || defaults.elicitSlot;
    this.hintText = options.hintText || defaults.hintText;
    this.bodyTemplate = options.bodyTemplate || defaults.bodyTemplate;
    this.listTemplate = options.listTemplate || defaults.listTemplate;
    this.audio = options.audio || defaults.audio;
    this.video = options.video || defaults.video;
  }
  handleResponse(req, res) {
    console.log(`[Alexa Response Handler] Formatting Response`);

    const supportsDisplay = doesSupportDisplay(req) || isSumulator(req);

    if(this.confirmIntent) {
      const confirmDirective = {
        "type": "Dialog.ConfirmIntent",
      }

      res.response.response.directives.push(confirmDirective)
    }
    if(this.elicitSlot) {
      const slotDirective = {
        "type": "Dialog.ElicitSlot",
        "slotToElicit": this.elicitSlot.slotName
      };
      if(this.elicitSlot.clearIntent) {
        slotDirective["updatedIntent"] = {
          "name": this.intentName,
          "confirmationStatus": "NONE"
        };
      }
      res.response.response.directives.push(slotDirective)
    }
    if(this.hintText && supportsDisplay) {
      const directive = {
        "type": "Hint",
        "hint": {
          "type": "PlainText",
          "text": this.hintText
        }
      };

      res.response.response.directives.push(directive);
    }
    if(this.bodyTemplate && supportsDisplay) {
      const directive = {
        "type": "Display.RenderTemplate",
        "template": {
          "type": "BodyTemplate2",
          "token": this.bodyTemplate.token,
          "backButton": "HIDDEN",
          //"backgroundImage": this.bodyTemplate.backgroundImage
          "title": this.bodyTemplate.title,
          //"image": bodyTemplate.imageObject,
          "textContent": {
            "primaryText": {
              "type": "RichText",
              "text": `<font size='4'>${this.bodyTemplate.primary_text}</font>`
            }
          }
        }
      };
      if(this.bodyTemplate.secondary_text) {
        directive.template.textContent.secondaryText = {
          "type": "RichText",
          "text": `<font size='2'>${this.bodyTemplate.secondary_text}</font>`
        }
      }
      res.response.response.directives.push(directive);
    }
    if(this.listTemplate && supportsDisplay) {
      const listItems = [];

      _.each(this.listTemplate.items, (item) => {
        listItems.push({
          "textContent": {
            "primaryText": {
              "type": "RichText",
              "text": "<font size='2'>" + item.primary_text + "</font>"
            }
          }
        });
      });
      const renderTemplateDirective = {
        "type": "Display.RenderTemplate",
        "template": {
          "type": "ListTemplate1",
          "token": this.listTemplate.token,
          "backButton": "HIDDEN",
          //"backgroundImage": "Image",
          "title": this.listTemplate.name,
          "listItems": listItems
        }
      };

      res.response.response.directives.push(renderTemplateDirective);
    }
    if(this.audio) {
      const stream = {
         "url": this.audio.url,
         "token": this.audio.token,
         "offsetInMilliseconds": 0
       };

      res.audioPlayerPlayStream("REPLACE_ALL", stream)
    }
    if(this.video) {
      const directive = {
        "type": "VideoApp.Launch",
        "videoItem": {
          "source": this.video.url,
          "metadata": {
              "title": this.video.title,
              "subtitle": this.video.subtitle
          }
        }
      };
      // res.card({
      //   type: "Simple",
      //   title: recipe.recipe_name,
      //   content: prompt
      // });
      res.response.response.directives.push(directive);
    }

    if(this.video && supportsDisplay) {
      res.response.response.outputSpeech = null;
      res.response.response.card = null;
      res.response.response.reprompt = null;
      delete res.response.response.shouldEndSession;
    } else {
      if(this.prompt) {
        res.say(this.prompt)
      }
      if(this.reprompt) {
        res.reprompt(this.reprompt)
      }
      res.shouldEndSession(this.shouldEndSession);
    }

    res.send();

    return res;
  }
}

export default AlexaResponseHandler;
