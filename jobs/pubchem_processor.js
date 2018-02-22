import PubChemService from '../services/pubchem.service';
import _ from 'lodash';

const PubChemProcessor = {
  processSDSDocument: function(entityName) {
    return new Promise((resolve, reject) => {
      console.log("Processing SDS Document for " + entityName);

      PubChemService.ParseSDSDocument(entityName)
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      })
    });
  }
}

module.exports = PubChemProcessor;
