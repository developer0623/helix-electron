import _ from 'lodash';
import express from 'express';
import request from 'supertest';
import mongoose from 'mongoose';
import alexaApp from '../../../lib/alexa';
import { IntentLog } from '../../models';
import {
  ApplicationFactory,
  CompanyFactory,
  RepositoryFactory,
  RecipeFactory,
  UserFactory } from '../../../factories';
import {
  createDB,
  destroyDB,
  formatPayload } from '../../../test/test-helper';
import { expect } from 'chai';

const APPLICATION_ID = "amzn1.echo-sdk-ams.app.000000-d0ed-0000-ad00-000000d00ebe";

let app = express();
alexaApp.express({
  expressApp: app,
  checkCert: false,
  debug: true
});

describe('Alexa Recipe Controller', () => {
  beforeEach((done) => {
    createDB(() => {
      done();
    });
  });
  afterEach((done) => {
    destroyDB(() => {
      done();
    });
  });
  describe('Getting a Recipe', () => {
    const intent = "RecipeIntent";
    const solution = {
        "recipe_name": 'Coomassie Blue Stain',
        "ingredients": [{
            name: '1.25g Coomassie Blue R-250'
          }, {
            name: '500mL Destain Solution'
        }],
        "instructions": "Stir for 1 Hour."
    }
    it('should return a prompt for a known recipe', (done) => {
      let user;
      let accessToken;
      let application;
      let company;
      let repository;
      let recipe;

      UserFactory.createUserWithAccessToken()
      .then((createdUser, createdAccessToken) => {
        user = createdUser;
        accessToken = createdAccessToken;

        return CompanyFactory.createCompany();
      })
      .then((createdCompany) => {
        company = createdCompany;

        return ApplicationFactory.createApplication(APPLICATION_ID, company);
      })
      .then((createdApplication) => {
        application = createdApplication;

        return RepositoryFactory.createRepository(company, "RECIPE");
      })
      .then((createdRepository) => {
        repository = createdRepository;

        return RecipeFactory.createRecipe(solution, company, repository);
      })
      .then((createdRecipe) => {
        recipe = createdRecipe;

        const payload =  {
          "type": "IntentRequest",
          "requestId": "amzn1.echo-api.request.0000000-0000-0000-0000-00000000000",
          "timestamp": "2015-05-13T12:34:56Z",
          "locale": "en-US",
          "intent": {
            "name": intent,
            "slots": {
              "RecipeName": {
                "name": "RecipeName",
                "value": solution.recipe_name
              }
            }
          }
        }
        return request(app)
        .post('/helix')
        .send(formatPayload(payload));
      })
      .then((res) => {
        expect(200);
        expect(res.body.response).to.be.an('object');
        const response = res.body.response;
        const outputSpeech = response.outputSpeech;

        let expectedSSML = '<speak>';
        expectedSSML += 'The ingredients for ' + solution.recipe_name + ' are ';
        expectedSSML += '<break time="0.5s" />';
        _.each(solution.ingredients, (ingredient) => {
          expectedSSML += ingredient.name;
          expectedSSML += '<break time="0.5s" />';
        });
        if (solution.instructions) {
          expectedSSML += 'Finally, ';
          expectedSSML += solution.instructions;
          expectedSSML += '.';
        }
        expectedSSML += '</speak>';

        const expectedOutput = {
          type: "SSML",
          ssml: expectedSSML
        }

        IntentLog.find({}, function(err, intentLogs) {
          if (err) { done(err); }
          expect(intentLogs.length).to.equal(1);

          expect(outputSpeech.type).to.equal(expectedOutput.type);
          expect(outputSpeech.ssml).to.equal(expectedOutput.ssml);

          done();
        })
      })
      .catch((err) => {
        done(err);
      });
    });

    it('should return a prompt if solution name is missing', (done) => {
      const solutionName = null;

      let user;
      let accessToken;
      let application;
      let company;
      let repository;
      let recipe;

      UserFactory.createUserWithAccessToken()
      .then((createdUser, createdAccessToken) => {
        user = createdUser;
        accessToken = createdAccessToken;

        return CompanyFactory.createCompany();
      })
      .then((createdCompany) => {
        company = createdCompany;

        return ApplicationFactory.createApplication(APPLICATION_ID, company);
      })
      .then((createdApplication) => {
        application = createdApplication;

        return RepositoryFactory.createRepository(company, "RECIPE");
      })
      .then((createdRepository) => {
        repository = createdRepository;

        return RecipeFactory.createRecipe(solution, company, repository);
      })
      .then((createdRecipe) => {
        recipe = createdRecipe;

        const payload =  {
          "type": "IntentRequest",
          "requestId": "amzn1.echo-api.request.0000000-0000-0000-0000-00000000000",
          "timestamp": "2015-05-13T12:34:56Z",
          "locale": "en-US",
          "intent": {
            "name": intent,
            "slots": {
              "RecipeName": {
                "name": "RecipeName",
                "value": solutionName
              }
            }
          }
        }
        return request(app)
        .post('/helix')
        .send(formatPayload(payload));
      })
      .then((res) => {
        expect(200)
        expect(res.body.response).to.be.an('object');
        const response = res.body.response;
        const outputSpeech = response.outputSpeech;

        const expectedOutput = {
          type: "SSML",
          ssml: "<speak>What solution are you making?</speak>"
        }
        IntentLog.find({}, function(err, intentLogs) {
          if (err) { done(err); }

          expect(intentLogs.length).to.equal(1);

          expect(outputSpeech.type).to.equal(expectedOutput.type);
          expect(outputSpeech.ssml).to.equal(expectedOutput.ssml);

          done();
        });
      })
      .catch((err) => {
        done(err);
      });
    });
    it('should return a prompt if solution name is empty', (done) => {
      const solutionName = null;

      let user;
      let accessToken;
      let application;
      let company;
      let repository;
      let recipe;

      UserFactory.createUserWithAccessToken()
      .then((createdUser, createdAccessToken) => {
        user = createdUser;
        accessToken = createdAccessToken;

        return CompanyFactory.createCompany();
      })
      .then((createdCompany) => {
        company = createdCompany;

        return ApplicationFactory.createApplication(APPLICATION_ID, company);
      })
      .then((createdApplication) => {
        application = createdApplication;

        return RepositoryFactory.createRepository(company, "RECIPE");
      })
      .then((createdRepository) => {
        repository = createdRepository;

        return RecipeFactory.createRecipe(solution, company, repository);
      })
      .then((createdRecipe) => {
        recipe = createdRecipe;

        const payload =  {
          "type": "IntentRequest",
          "requestId": "amzn1.echo-api.request.0000000-0000-0000-0000-00000000000",
          "timestamp": "2015-05-13T12:34:56Z",
          "locale": "en-US",
          "intent": {
            "name": intent,
            "slots": {
              "RecipeName": {
                "name": "RecipeName",
                "value": solutionName
              }
            }
          }
        }

        return request(app)
        .post('/helix')
        .send(formatPayload(payload));
      })
      .then((res) => {
        expect(200)
        expect(res.body.response).to.be.an('object');
        const response = res.body.response;
        const outputSpeech = response.outputSpeech;

        const expectedOutput = {
          type: "SSML",
          ssml: "<speak>What solution are you making?</speak>"
        }
        IntentLog.find({}, function(err, intentLogs) {
          if (err) { done(err); }

          expect(intentLogs.length).to.equal(1);

          expect(outputSpeech.type).to.equal(expectedOutput.type);
          expect(outputSpeech.ssml).to.equal(expectedOutput.ssml);

          done();
        });
      })
      .catch((err) => {
        done(err);
      });
    });
    it('should return a prompt for an unknown solution name', (done) => {
      const solutionName = "Unknown Solution Name";

      let user;
      let accessToken;
      let application;
      let company;
      let repository;
      let recipe;

      UserFactory.createUserWithAccessToken()
      .then((createdUser, createdAccessToken) => {
        user = createdUser;
        accessToken = createdAccessToken;

        return CompanyFactory.createCompany();
      })
      .then((createdCompany) => {
        company = createdCompany;

        return ApplicationFactory.createApplication(APPLICATION_ID, company);
      })
      .then((createdApplication) => {
        application = createdApplication;

        return RepositoryFactory.createRepository(company, "RECIPE");
      })
      .then((createdRepository) => {
        repository = createdRepository;

        return RecipeFactory.createRecipe(solution, company, repository);
      })
      .then((createdRecipe) => {
        recipe = createdRecipe;

        const payload =  {
          "type": "IntentRequest",
          "requestId": "amzn1.echo-api.request.0000000-0000-0000-0000-00000000000",
          "timestamp": "2015-05-13T12:34:56Z",
          "locale": "en-US",
          "intent": {
            "name": intent,
            "slots": {
              "RecipeName": {
                "name": "RecipeName",
                "value": solutionName
              }
            }
          }
        }
        return request(app)
        .post('/helix')
        .send(formatPayload(payload));
      })
      .then((res) => {
        expect(201);
        expect(res.body.response).to.be.an('object');

        const response = res.body.response;
        const outputSpeech = response.outputSpeech;

        const expectedOutput = {
          type: "SSML",
          ssml: "<speak>I\'m not sure about that solution. Can you say the name again?</speak>"
        }

        IntentLog.find({}, function(err, intentLogs) {
          if (err) { done(err); }
          expect(intentLogs.length).to.equal(1);

          expect(outputSpeech.type).to.equal(expectedOutput.type);
          expect(outputSpeech.ssml).to.equal(expectedOutput.ssml);

          done();
        });
      });
    });
  });
});
