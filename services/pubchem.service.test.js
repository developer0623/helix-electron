import PubChemService from './pubchem.service';
import { createDB, destroyDB } from '../test/test-helper';
import Entity from '../app/models/entity';
import { expect } from 'chai';
import _ from 'lodash';
import tree from './pubchem.parsetree';

describe('PubChem Service', () => {
  beforeEach((done) => {
    createDB(() => {
      //for pubchem all of the possible entities are the associated values in
      //the parsetree; we'll preload all of these as Terms with Associated Entity Properties
      //so we can handle slight variations in the ways properties are queried (uppercase, wrong spelling, ect)
      // let keys = [];
      // _.forOwn(tree, (value, key) => {
      //   keys.push(key);
      // });
      // let treeLength = keys.length;
      // _.each(keys, (key) => {
      //   EntityProperty.processEntityProperty(key)
      //   .then((entityProperty) => {
      //     treeLength = treeLength - 1;
      //     if(treeLength == 0) {
      //       done();
      //     }
      //   })
      //   .catch((err) => {
      //     treeLength = treeLength - 1;
      //
      //     console.log(err);
      //   });
      // });
    });
  });
  afterEach((done) => {
    destroyDB(() => {
      done();
    });
  });
  describe('Getting a SDS', () => {

    it('it should return the value for a lower case property name for a known substance', (done) => {
      const entityName = "methanol";
      const propertyName = "boiling point";
      const expectedResult = "148.3° F at 760 mm Hg (NTP, 1992)";

      PubChemService.LookupProperty(entityName, propertyName)
      .then((results) => {
        const formalName = results[0];
        const result = results[1];

        expect(result).to.equal(expectedResult);

        done();
      })
      .catch((err) => {
        console.log(err);

        done(err);
      })
    });
    it('it should return the value for an upper case property name for a know substance', (done) => {
      const entityName = "Methanol";
      const propertyName = "Melting Point";
      const expectedResult = "-144° F (NTP, 1992)";

      PubChemService.LookupProperty(entityName, propertyName)
      .then((results) => {
        const formalName = results[0];
        const result = results[1];

        expect(result).to.equal(expectedResult);

        done();
      })
      .catch((err) => {
        console.log(err);

        done(err);
      })
    });
    it('it should return the value for mixed case property name for a know substance', (done) => {
      const entityName = "Methanol";
      const propertyName = "Melting point";
      const expectedResult = "-144° F (NTP, 1992)";

      PubChemService.LookupProperty(entityName, propertyName)
      .then((results) => {
        const formalName = results[0];
        const result = results[1];

        expect(result).to.equal(expectedResult);

        done();
      })
      .catch((err) => {
        console.log(err);

        done(err);
      })
    });
    it('it should return an error for an unkown entity name', (done) => {
      const entityName = "Banana";
      const propertyName = "Melting point";
      const errorMessage = "Unknown entity: Banana";

      PubChemService.LookupProperty(entityName, propertyName)
      .then((results) => {
        const formalName = results[0];
        const result = results[1];

        console.log(result);

        done();
      })
      .catch((err) => {
        expect(err).to.not.be.null;
        expect(err).to.not.be.undefined;
        expect(err.message).to.equal(errorMessage);

        done();
      })
    });
    it('it should return an error for an unkown entity name', (done) => {
      const entityName = "Methanol";
      const propertyName = "Banana";
      const errorMessage = "Invalid property: Banana";

      PubChemService.LookupProperty(entityName, propertyName)
      .then((results) => {
        const formalName = results[0];
        const result = results[1];

        console.log(result);

        done();
      })
      .catch((err) => {
        expect(err).to.not.be.null;
        expect(err).to.not.be.undefined;
        expect(err.message).to.equal(errorMessage);

        done();
      })
    });
    it('it should parse an entire SDS document and return a property with lowercase name', (done) => {

      const entityName = "methanol";
      const propertyName = "molecular weight";
      const expectedResult = "32.042 g/mol"

      PubChemService.ParseSDSDocument(entityName)
      .then(() => {
        //set timeout used to ensure post middleware is called
        setTimeout(function() {
          Entity.lookupValue(entityName, propertyName)
          .then((result) => {
            expect(result).to.equal(expectedResult);

            done();
          })
          .catch((err) => {
            done(err);
          });
        }, 1000);
      })
      .catch((err) => {
        console.log(err);

        done(err);
      });
    });
    it('it should parse an entire SDS document and return a property with uppercase name', (done) => {

      const entityName = "methanol";
      const propertyName = "Molecular Weight";
      const expectedResult = "32.042 g/mol"

      PubChemService.ParseSDSDocument(entityName)
      .then(() => {
        //set timeout used to ensure post middleware is called
        setTimeout(function() {
          Entity.lookupValue(entityName, propertyName)
          .then((result) => {
            expect(result).to.equal(expectedResult);

            done();
          })
          .catch((err) => {
            done(err);
          });
        }, 1000);
      })
      .catch((err) => {
        console.log(err);

        done(err);
      });
    });
    it('it should parse an entire SDS document and return a property with mixed name', (done) => {

      const entityName = "methanol";
      const propertyName = "molecular Weight";
      const expectedResult = "32.042 g/mol"

      PubChemService.ParseSDSDocument(entityName)
      .then(() => {
        //set timeout used to ensure post middleware is called
        setTimeout(function() {
          Entity.lookupValue(entityName, propertyName)
          .then((result) => {
            expect(result).to.equal(expectedResult);

            done();
          })
          .catch((err) => {
            done(err);
          });
        }, 1000);
      })
      .catch((err) => {
        console.log(err);

        done(err);
      });
    });
    it('it should parse an entire SDS document and return a property with misspelling', (done) => {
      const entityName = "methanol";
      const propertyName = "Molecular Weght";
      const expectedResult = "32.042 g/mol"

      PubChemService.ParseSDSDocument(entityName)
      .then(() => {
        //set timeout used to ensure post middleware is called
        setTimeout(function() {
          Entity.lookupValue(entityName, propertyName)
          .then((result) => {
            expect(result).to.equal(expectedResult);

            done();
          })
          .catch((err) => {
            done(err);
          });
        }, 1000);
      })
      .catch((err) => {
        console.log(err);

        done(err);
      });
    });

  });
});
