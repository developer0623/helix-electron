const vdSDK = require("virtual-device-sdk");
import async from 'async';
const virtualDevice = new vdSDK.VirtualDevice("93062347-59ca-463b-8097-0fe0c9566a0d");
const messages = [
  "What is the catalog number of a. g. e. I",
  "What is the catalog number of AAT2",
  "What is the catalog number for BgIII",
  "What is the catalog number for BbsI"
];
const entities = [
  'a. g. e. I',
  'AAT2',
  'BgIII',
  'BbsI',
  'XbaI',
  'NotI',
  'MslI',
  'KpnI',
  'Nt.BstNBI',
  'BsaI-HF',
  'XhoI',
  'SspI',
  'SmlI',
  'HindIII',
  'DpnII',
  'DpnI',
  'BstBI',
  'EcoP15I',
  'BamHI-HF',
  'BaeI',
  'BamHI'
];
const properties = [
  'catalog number',
  'cut site',
  'Time Saver Qualified',
  'Incubation Temperature',
  'Requires SAM',
  'Heat Inactivation Temperature',
  'Heat Inactivation Time',
  'Supplied NEB Buffer',
  'Catalog Number',
  'Methylation Sensitivity'
];

function iterateMessages() {
  return new Promise((resolve, reject) => {
    async.eachSeries(properties, (property, callback) => {
      async.eachSeries(entities, (entity, callback) => {
        const message = `What is the ${property} for ${entity}`;
        virtualDevice.message("open helix n. e. b.")
        .then((result) => {
          return virtualDevice.message(message);
        })
        .then((result) => {
          console.log(`${message} => ${result.transcript}`);

          callback();
        })
        .catch((err) => {
          callback(err);
        });

      }, (err) => {
        if(err) { callback(err); }

        callback();
      });
    }, (err) => {
      if(err) { reject(err); }

      resolve();
    });
  });
}
const NebTest = {
  start: () => {
    console.log("Starting NEB Testing");
    iterateMessages()
    .then(() => {
      console.log('Test Complete')
    })
    .catch((err) => {
      console.log(err);
    })
  }
}

NebTest.start();
