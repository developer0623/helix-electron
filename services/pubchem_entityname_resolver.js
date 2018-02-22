import Nightmare from 'nightmare';
import _ from 'lodash';
import async from 'async';

const PubChemEntityNameResolver = {
  resolveName: (entityName) => {
    return new Promise((resolve, reject) => {
      const url = "https://www.ncbi.nlm.nih.gov/pccompound/?term=" + entityName;

      var nightmare = Nightmare({ show: false,
        waitTimeout: 1000 // in ms
      });
      nightmare
      .goto(url)
      .wait('.rprt')
      .evaluate(() => {
        const names = [];
        document.querySelectorAll('.rprt p.title a').forEach((element) => {
          names.push(element.innerText);
        });

        return names;
      })
      .end()
      .then((results) => {
        if(!_.isEmpty(results)) {
          const names = results[0].split(";");

          if(!_.isEmpty(names)) {
            resolve(names[0]);
          } else {
            resolve(null);
          }
        } else {
          resolve(null);
        }
      })
      .catch((error) => {
        reject(error);
      });
    });
  }
}

module.exports = PubChemEntityNameResolver;
