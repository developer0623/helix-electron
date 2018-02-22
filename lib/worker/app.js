import mongoose from 'mongoose';
import _ from 'lodash';
import logger from 'logfmt';
import { EventEmitter } from 'events';

import connections from '../../src/connection';
import queues from '../queues';

import ReminderProcessor from '../../jobs/reminder_processor';
import EmailProcessor from '../../jobs/email_processor';
import ImportQuartzyInventory from '../../jobs/import_quartzy_inventory';
import PubChemProcessor from '../../jobs/pubchem_processor';
import ActionParser from '../../jobs/parse_protocol_steps';
import SlackMessenger from '../../jobs/slack_messenger';
import RequestLogProcessor from '../../jobs/request_log_processor';
// import Trainer from '../../jobs/applications/trainer';

import Application from '../../app/models/application';
import Company from '../../app/models/company';
import CompanyUser from '../../app/models/company_user';

import ApplicationUpdateProcessor from '../../workers/application_update_processor';
import ApplicationBuildStatusProcessor from '../../workers/application_build_status_processor';
import EntityUpdateProcessor from '../../workers/entity_update_processor';
import RepositoryUpdateProcessor from '../../workers/repository_update_processor';

import AlexaForBusinessOperationTypes from '../../services/aws/AlexaForBusinessOperationTypes';
import AlexaForBusinessServices from '../../services/aws/alexa_for_business_service';

import * as emailTypes from '../../app/models/types/emailTypes';

function processReminderQueue(data) {
  ReminderProcessor.sendReminders()
  .then(() => {
    console.log("Reminders Sent!");
  })
  .catch((err) => {
    console.log("Something unfortunate happened: " + err);
  });
}
function processEmailQueue(data) {
  const emailType = data.email_type;

  switch(emailType) {
    case emailTypes.WELCOME_EMAIL:
      EmailProcessor.sendBetaSignupEmail(data.marketing_lead_id)
      .then(() => {
        console.log("Welcome Email Sent!");
      })
      .catch((err) => {
        console.log("Something unfortunate happened: " + err);
      });
      break;
    case emailTypes.RESET_PASSWORD_LINK_EMAIL:
      EmailProcessor.sendResetPasswordEmail(data.link_id)
      .then(() => {
        console.log("Reset Password Link Email Sent!");
      })
      .catch((err) => {
        console.log("Something unfortunate happened: " + err);
      });
  }
}
function processInventoryQueue(data) {
  console.log('Processing Inventory Queue');

  ImportQuartzyInventory.processJob(data.job_id, mongoose.Types.ObjectId(data.user._id), data.retryCount)
  .then(() => {
    console.log("Inventory upload processed! Retry count: ", data.retryCount ? data.retryCount : 0);
  })
  .catch((err) => {
    console.log("Something unfortunate happened: " + err);
    console.log(err.stack);
  });
}
function processPubChemQueue(data) {
  PubChemProcessor.processSDSDocument(data.entityName)
  .then(() => {
    console.log("Processed SDS Document for " + data.entityName);
  })
  .catch((err) => {
    console.log("Something unfortunate happened. Failed to Process SDS Document for " + data.entityName + " : " + err);
  });
}
function processProtocolActions(data, ack, nack, deliveryInfo) {
  console.log(`Parsing Protocol Actions for ${data.protocol_id}`);

  ActionParser.parseProtocolSteps(data.protocol_id)
  .then(() => {
    console.log("Parsed steps for protocol: " + data.protocol_id);
    ack();
  })
  .catch((err) => {
    console.log("Something unfortunate happened. Failed to parse steps for " + data.protocol_id + " : " + err);
    ack();
  });
}
function processSlackQueue(data, ack, nack) {
  console.log(`Proccessing slack message from queue to ${data.channel}: ${data.message}`);

  SlackMessenger.processMessage(data.channel, data.message, data.username)
  .then(() => {
    console.log(`Successfully proccessed slack message from queue to ${data.channel}: ${data.message}`);

    ack();
  })
  .catch((err) => {
    console.log(`Failed to proccess slack message ${data.message}: ${err}`);
    ack();
  });
}
function processRequestLogQueue(data) {
  console.log(`Proccessing request log queue ${data.intent}: ${JSON.stringify(data.request)}`);

  RequestLogProcessor.processRequest(data.intent, data.request, data.prompt, data.resolved)
  .then(() => {
    console.log(`Successfully proccessed request log queue ${data.intent}: ${JSON.stringify(data.request)}`);
  })
  .catch((err) => {
    console.log(`Failed to proccess request log queue ${data.intent}:${JSON.stringify(data.request)}:${err}`);
  });
}
function processApplicationQueue(data) {
  console.log(`Processing application queue ${data.application_id}`);

  ApplicationUpdateProcessor.process(data)
  .then(() => {
    console.log(`Successfully processed application update ${data.application_id}}`);
  })
  .catch((err) => {
    console.log(`Failed to proccess application update queue ${data.application_id}: ${err}`);
  });
}
function processEntityUpdate(data) {
  EntityUpdateProcessor.process(data)
  .then(() => {
    console.log(`Successfully processed entity update ${data.entity_id}}`);
  })
  .catch((err) => {
    console.log(`Failed to proccess entity update queue ${data.entity_id}: ${err}: ${err.stack}`);
  });
}
function processApplicationBuildStatus(data) {
  ApplicationBuildStatusProcessor.process()
  .then(() => {
    console.log("Application Build Status Processed!");
  })
  .catch((err) => {
    console.log("Failed processing Application Build Status: " + err);
  });
}
function processAlexaForBusinessQueue(data) {
  const operation = data.operation;

  switch(operation) {
    //CREATE OR UPDATE AN ORGANIZATION USER IN ALEXA FOR Business
    // {
    //    operation: 'organization_user',
    //    company_id: '1231231321321adfafd',
    //    user_id: '12313213123213afdaf'
    // }
    case AlexaForBusinessOperationTypes.SAVE_ORGANIZATION_USER: {
      console.log(`Handling Save Organization User ${JSON.stringify(data)}`);

      const companyId = data.company_id;
      const userId = data.user_id;

      let company;
      let user;

      Company.findById(companyId)
      .then((results) => {
        company = results;

        if(!company) { throw new Error(`Company ${JSON.stringify(data.company_id)} not found}`); }
        if(!company.amazon_iam_role_arn) { throw new Error(`Company ${data.company_id} does not have a IAM Role ARN defined`); }

        return CompanyUser.findById(userId);
      })
      .then((results) => {
        if(!results) { throw new Error(`User ${userId} not found`); }

        user = results;

        if(user.amazon_user_arn) {
          AlexaForBusinessServices.updateUser(user, company.amazon_iam_role_arn)
          .then(() => {
            console.log('Updated Organization User')
          })
          .catch((err) => {
            console.log('Failed Updating Organization User')

            throw err;
          });
        } else {
          AlexaForBusinessServices.createUser(user, company.amazon_iam_role_arn)
          .then((amazon_user_arn) => {
            user.amazon_user_arn = amazon_user_arn;

            return user.save()
          })
          .then(() => {
            console.log('Created Organization User')
          })
          .catch((err) => {
            console.log('Failed Creating Organization User')

            throw err;
          });
        }
      })
      .catch((err) => {
        throw err;
      });

      break;
    }
    case AlexaForBusinessOperationTypes.DELETE_ORGANIZATION_USER: {
      console.log(`Handling Delete Organization User ${JSON.stringify(data)}`);

      const companyId = data.company_id;
      const userId = data.user_id;

      let company;

      Company.findById(companyId)
      .then((results) => {
        company = results;

        if(!company) { throw new Error(`Company ${JSON.stringify(data.company_id)} not found}`); }
        if(!company.amazon_iam_role_arn) { throw new Error(`Company ${data.company_id} does not have a IAM Role ARN defined`); }

        return CompanyUser.findById(userId);
      })
      .then((user) => {
        if(!user) { throw new Error(`User ${userId} not found`); }

        return AlexaForBusinessServices.deleteUser(user, company.amazon_iam_role_arn)
      })
      .then(() => {
        console.log('Deleted Organization User')
      })
      .catch((err) => {
        console.log('Failed Deleting Organization User')

        throw err;
      });

      break;
    }
    default:
      console.log(`I don't know how to handle the Alexa for Business Operation ${operation}`);
  }
}
function App(config) {
  EventEmitter.call(this);

  this.config = config;
  this.connections = connections.createConnection(config.mongo_url, config.rabbit_url);
  this.connections.once('ready', this.onConnected.bind(this));
  this.connections.once('lost', this.onLost.bind(this));
  this.connections.once('error', (error) => {
    console.log("********** ERROR **************")
    if (error.code !== 404) {
      throw err;
    }
  });
}

module.exports = function createApp(config) {
  return new App(config);
};

App.prototype = Object.create(EventEmitter.prototype);

App.prototype.onConnected = function() {

  this.connections.queue
    .default()
    .queue({ name: queues.REMINDER_QUEUE })
    .consume(processReminderQueue, { noAck: true });

  this.connections.queue
    .default()
    .queue({ name: queues.EMAIL_QUEUE })
    .consume(processEmailQueue, { noAck: true });

  this.connections.queue
    .default()
    .queue({ name: queues.INVENTORY_QUEUE })
    .consume(processInventoryQueue, { noAck: true });

  this.connections.queue
    .default()
    .queue({ name: queues.PUBCHEM_QUEUE })
    .consume(processPubChemQueue, { noAck: true});

  // this.connections.queue
  //   .default()
  //   .queue({ name: queues.PROTOCOL_ACTION_PARSER_QUEUE })
  //   .consume(processProtocolActions, { ack: true });

  this.connections.queue
    .default()
    .queue({ name: queues.SLACK_QUEUE })
    .consume(processSlackQueue, { noAck: false });

  this.connections.queue
    .default()
    .queue({ name: queues.AUDIT_LOG_QUEUE })
    .consume(processRequestLogQueue, { noAck: true });

  this.connections.queue
    .default()
    .queue({ name: queues.APPLICATION_QUEUE })
    .consume(processApplicationQueue, { noAck: true });

  this.connections.queue
    .default()
    .queue({ name: queues.AWS_ALEXA_FOR_BUSINESS_QUEUE })
    .consume(processAlexaForBusinessQueue, { noAck: true});

  this.connections.queue
    .default()
    .queue({ name: queues.ENTITY_UPDATE_QUEUE })
    .consume(processEntityUpdate, { noAck: true });

  this.connections.queue
    .default()
    .queue({ name: queues.APPLICATION_BUILD_STATUS_QUEUE })
    .consume(processApplicationBuildStatus, { noAck: true });

  this.onReady();
};
App.prototype.onReady = function() {
  console.log("******* READY *********");

  logger.log({ type: 'info', msg: 'app.ready' });

  this.emit('ready');
};

App.prototype.onLost = function() {
  console.log("******* LOST *********");
  logger.log({ type: 'info', msg: 'app.lost' });

  this.emit('lost');
};

App.prototype.startScraping = function() {
  console.log("start listening");
  //this.connections.queue.handle(queues.PROTOCOL_ACTION_PARSER_QUEUE, this.handleScrapeJob.bind(this));
  //this.connections.queue.handle(VOTE_QUEUE, this.handleVoteJob.bind(this));
  return this;
};
