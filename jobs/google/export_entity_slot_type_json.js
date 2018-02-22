import config from '../../src/config';
import connections from '../../src/connection';
import _ from 'lodash';
import TermIndex from '../../services/elastic_search_term_index';
import entities from '../entities';

import * as customSlotTypes from '../../app/models/types/customSlotTypes';

function getEntities(customSlotType) {
  return new Promise((resolve, reject) => {
    CustomSlot.find({custom_slot_type: customSlotType})
    .then((entities) => {
      resolve(entities);
    })
    .catch((err) => {
      reject(err);
    });
  });
}
function exportEntityJson() {
  let json = {};
  let values = [];

  json["name"] = "ENTITY";

  const customSlotType = customSlotTypes.ENTITY;

  getEntities(customSlotType)
  .then((entities) => {
    console.log(`${entities.length}`);

    _.each(entities, (entity) => {
      values.push({
        "value": entity.name,
        "synonyms": [entity.name]
      });
    });

    json["values"] = values;

    console.log(JSON.stringify(values, null, 4));
  })
  .catch((err) => {
    console.log(err);
  });
}


console.log("Exporting Entity JSON Custom Slot for Amazon");

connections.createConnection(config.mongo_url, config.rabbit_url);
exportEntityJson();
