import superagent from 'superagent';
import config from '../src/config';
import connections from '../src/connection';
import _ from 'lodash';
import async from 'async';
import Protocol from '../app/models/entity';

function getProtocolList(access_token, page) {
  return new Promise((resolve, reject) => {
    superagent('POST', `https://protocols.io/api/open/get_protocols?page_id=${page}` )
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .send(`access_token=${access_token}`)
    .end((err, res) => {
      if(err) {
        reject(err);
      }
      resolve(res.body);
    });
  });
}
function getProtocols(access_token, protocols) {
  return new Promise((resolve, reject) => {
    async.eachSeries(protocols, (protocol, callback) => {
      getProtocol(access_token, protocol.protocol_id)
      .then((result) => {
        const protocol = new Protocol();
        const protocolProperties = [];

        protocol.protocol_name = result.protocol.protocol_name;

        const materials = [];

        _.each(result.protocol.materials, (material) => {
          materials.push(material.reagent_name);
        });
        if(!_.isEmpty(materials)) {
          protocolProperties.push({
            key: "Materials",
            value: materials
          });
        }
        _.each(result.protocol.steps, (step) => {
          const newStep = {};

          _.each(step.components, (component) => {
            if(component.name == "Section") {
              if(component.data && component.data.length > 0) {
                newStep.name = component.data;
              }
            }
          });
          if(newStep.name) {
            protocol.steps.push(newStep);
          }
        });
        protocol.properties = protocolProperties;

        protocol.save()
        .then(() => {
          console.log(`saved protocol ${protocol.protocol_name}`);

          callback();
        })
        .catch((err) => {
          console.log(err);

          callback(err);
        });
      })
      .catch((err) => {
        callback(err);
      })
    }, (err) => {
      if(err) {
        reject(err);
      }

      resolve();
    });
  });
}
function getProtocol(access_token, protocol_id) {
  return new Promise((resolve, reject) => {
    superagent('POST', `https://protocols.io/api/open/get_protocol_json` )
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .send(`access_token=${access_token}`)
    .send(`protocol_id=${protocol_id}`)
    .end((err, res) => {
      if(err) {
        reject(err);
      }
      resolve(res.body);
    });
  });
}
const ProtocolsIOImport = {
  parseProtocols: function() {
    const access_token = "11cfcb40a97c712053257800cd85a63499eda1fd";
    let page = 1;
    let allProtocols;

    getProtocolList(access_token, page)
    .then((protocols) => {
      const total_pages = protocols.total_pages;

      console.log(total_pages);
      async.times(total_pages, function(index, next) {
        getProtocolList(access_token, index)
        .then((result) => {
          next(null, result.protocols);
        })
        .catch((err) => {
          console.log(err);

          next(err, null);
        });
      }, (err, results) => {
        allProtocols = _.flatten(results);

        console.log(allProtocols.length);

        return getProtocols(access_token, allProtocols)
      })
    })

    .catch((err) => {
      console.log(err);
    });
  }
}

connections.createConnection(config.mongo_url, config.rabbit_url);
ProtocolsIOImport.parseProtocols();
