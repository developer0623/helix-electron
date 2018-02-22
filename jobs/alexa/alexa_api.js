import superagent from 'superagent';
import {_} from 'lodash';

const AlexaApi = {
  refreshToken: (refresh_token) => {
    return new Promise((resolve, reject) => {
      const url = "https://api.amazon.com/auth/o2/token";
      const payload = {
      	"grant_type": "refresh_token",
      	"refresh_token": refresh_token,
      	"client_id": process.env.AMAZON_CLIENT_ID,
      	"client_secret": process.env.AMAZON_CLIENT_SECRET
      }

      superagent('POST', url)
      .set('Content-Type', 'application/json')
      .send(payload)
      .end(function(err, res) {
        if(err) {
          return reject(err);
        }
        // {
        //    "access_token":"Atza|IQEBLjAsAhRmHjNgHpi0U-Dme37rR6CuUpSR...",
        //    "token_type":"bearer",
        //    "expires_in":3600,
        //    "refresh_token":"Atzr|IQEBLzAtAhRPpMJxdwVz2Nn6f2y-tpJX2DeX..."
        // }
        resolve(res.body);
      });
    });
  },
  getSkillManifest: (access_token, skill_id) =>  {
    return new Promise((resolve, reject) => {
      const url = `https://api.amazonalexa.com/v0/skills/${skill_id}`;

      superagent('GET', url)
      .set('AUTHORIZATION', access_token)
      .set('Content-Type', 'application/json')
      .end(function(err, res) {
        if(err) {
          reject(err);
        }
        resolve(res.body);
      });
    });
  },
  createSkillManifest: (access_token, skill_manifest) =>  {
    return new Promise((resolve, reject) => {
      const url = `https://api.amazonalexa.com/v0/skills`;
      const payload = {
        vendorId: "MABO1CGDUPZJ",
        skillManifest: skill_manifest
      };

      superagent('POST', url)
      .set('AUTHORIZATION', access_token)
      .set('Content-Type', 'application/json')
      .send(payload)
      .end(function(err, res) {
        if(err) {
          reject(err);
        }
        resolve(res.body);
      });
    });
  },
  updateSkillManifest: (access_token, skill_id, skill_manifest) => {
    return new Promise((resolve, reject) => {
      const url = `https://api.amazonalexa.com/v0/skills/${skill_id}`;
      const payload = {
        skillManifest: skill_manifest
      };

      superagent('PUT', url)
      .set('AUTHORIZATION', access_token)
      .set('Content-Type', 'application/json')
      .send(payload)
      .end(function(err, res) {
        if(err) {
          reject(err);
        }
        resolve(res.body);
      });
    });
  },
  getSkillStatus: (access_token, skill_id) => {
    return new Promise((resolve, reject) => {
      const url = `https://api.amazonalexa.com/v0/skills/${skill_id}/status`;
      const payload = {
        skillManifest: skill_manifest
      };

      superagent('GET', url)
      .set('AUTHORIZATION', access_token)
      .set('Content-Type', 'application/json')
      .end(function(err, res) {
        if(err) {
          reject(err);
        }
        resolve(res.body);
      });
    });
  },
  deleteSkill: (access_token, skill_id) => {
    return new Promise((resolve, reject) => {
      const url = `https://api.amazonalexa.com/v0/skills/${skill_id}`;

      superagent('DELETE', url)
      .set('AUTHORIZATION', access_token)
      .set('Content-Type', 'application/json')
      .send(payload)
      .end(function(err, res) {
        if(err) {
          reject(err);
        }
        resolve(res.body);
      });
    });
  },
  getInteractionModel: (access_token, skill_id, locale) => {
    return new Promise((resolve, reject) => {
      const url = `https://api.amazonalexa.com/v0/skills/${skill_id}/interactionModel/locales/${locale}`;

      superagent('GET', url)
      .set('AUTHORIZATION', access_token)
      .set('Content-Type', 'application/json')
      .end(function(err, res) {
        if(err) {
          return reject(err);
        }
        resolve(res.body);
      });
    });
  },
  updateInteractionModel: (access_token, skill_id, interaction_model, locale) => {
    return new Promise((resolve, reject) => {
      const url = `https://api.amazonalexa.com/v0/skills/${skill_id}/interactionModel/locales/${locale}`;

      superagent('POST', url)
      .set('AUTHORIZATION', access_token)
      .set('Content-Type', 'application/json')
      .send(interaction_model)
      .end(function(err, res) {
        if(err) {
          return reject(err);
        }
        resolve(res.body);
      });
    });
  },
  getInteractionModelBuildStatus: (access_token, skill_id, locale) => {
    return new Promise((resolve, reject) => {
      const url = `https://api.amazonalexa.com/v0/skills/${skill_id}/interactionModel/locales/${locale}/status`;

      superagent('GET', url)
      .set('AUTHORIZATION', access_token)
      .set('Content-Type', 'application/json')
      .end(function(err, res) {
        if(err) {
          return reject(err);
        }
        resolve(res.body);
      });
    });
  },
}

module.exports = AlexaApi;
