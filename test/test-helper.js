// ./test/test-helper.js
import mongoose from 'mongoose';
mongoose.Promise = global.Promise;

const Mockgoose = require('mockgoose').Mockgoose;
const mockgoose = new Mockgoose(mongoose);
/*
 * Creates and/or connects to a mongo test database in memory
 * @param {function} cb callback function
 * @returns {void}
 */

module.exports.createDB = callback => {
  console.log('setting up mongoose');
  mockgoose.prepareStorage().then(() => {
    mongoose.connect('mongodb://localhost/test', function(err) {
      mockgoose.helper.reset().then(() => {
        callback(err);
      });
    });
  });
};

/*
 * Disconnects from and destroys the mongo test database in memory
 * @returns {void}
 */
module.exports.destroyDB = callback => {
  console.log('destroying mongoose');

  mockgoose.helper.reset().then(() => {
    mongoose.connection.close();

    callback();
  });
};
module.exports.formatPayload = (payload) => {
  const accessToken = "oO0OmQDyCH5B0LtbuvMndzLdxD7UKPR1E5CC6tMbw8JJm1GEUE5EaClhcxn6dKBpa82nKQtqd0skjIDiHZHAjgoLdfacaVaXY9zEALag3UF92C0AnKUKcJdD8qZU5J1BOR2BUMxj4Ozw3bgjtU5sDktOpPkKGE8YXxDpUod1CtDwRYKdqqBnPCfDGlKCqCvsH4A3Bbcc6oc7XhEOEXHuHcTFzHOLIZLU5l6YlFyBRJDNwfJf0ZaUFvUarZ6HfcU6";

  return {
    "version": "1.0",
    "session": {
      "new": true,
      "sessionId": "amzn1.echo-api.session.0000000-0000-0000-0000-00000000000",
      "application": {
        "applicationId": "amzn1.echo-sdk-ams.app.000000-d0ed-0000-ad00-000000d00ebe"
      },
      "user": {
        "userId": "amzn1.account.AM3B00000000000000000000000",
        "accessToken": accessToken
      }
    },
    "context": {
      "System": {
        "application": {
          "applicationId": "amzn1.echo-sdk-ams.app.000000-d0ed-0000-ad00-000000d00ebe"
        },
        "user": {
          "userId": "amzn1.account.AM3B00000000000000000000000"
        },
        "device": {
  				"deviceId": "amzn1.ask.device.AFMV6FXYA2U6SLXL5PKCRAQ3CGWOPVUWUWJTE5QIWLJL7UXLNH3LP42GRPG4LLO2Y3NLS4QM4DT557ALJ4IDEEPN2KDLGQ5ISKS7OJTDEB6ZTRG7AHYMZS5WRUG4MYPKN2KOF4OW6RX2BQT2I7QMJM4YUCASJUUDGTHI4S5WQK7BXTCW4M6CA",
  				"supportedInterfaces": {
  					"AudioPlayer": {},
  					"Display": {
  						"templateVersion": "1.0",
  						"markupVersion": "1.0"
  					}
  				}
        }
      },
      "AudioPlayer": {
        "offsetInMilliseconds": 0,
        "playerActivity": "IDLE"
      }
    },
    "request" : payload
  }
};
