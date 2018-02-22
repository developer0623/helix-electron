import Application from '../app/models/application';
import Company from '../app/models/company';
import Entity from '../app/models/entity';
import Repository from '../app/models/repository';
import RepositoryType from '../app/models/repository_type';

import PublishManager from '../app/managers/publish_manager';

import AlexaSkillBuilder from '../jobs/alexa/skill_builder';

import config from '../src/config';
import connections from '../src/connection';
import queues from '../lib/queues';
import async from 'async';

const connector = connections.createConnection(config.mongo_url, config.rabbit_url);

connector.on('ready', () => {
  let company;
  let repositoryType;
  let repository;

  Company.findById("59d4e6deb4466d23e5db2df7")
  .then((result) => {
    company = result;

    return RepositoryType.findById("5a3fbc9cf36d2805ea5170af");
  })
  .then((result) => {
    repositoryType = result;

    const newRepository = new Repository({
      name: "Order Requests",
      repository_type: repositoryType,
      owner: company,
      private: true
    });

    return newRepository.save();
  })
  .then((savedRepository) => {
    repository = savedRepository;
    console.log(`CREATED REPOSITORY ${savedRepository._id}`);

    const itemNames = ['Acetic Anhydride', 'Propane', 'Methane', 'Qualcom Fluid', 'XLarge Glove', 'Knit caps', 'Abietic Acid', 'Asprin', 'Chloric Acid', 'Butane', 'Small Gloves', 'Mitric Acid', 'Sulfuric Acid'];

    async.each(itemNames, (itemName, callback) => {
      const entity = new Entity({
        type: 'ORDERITEM',
        name: itemName,
        repository: savedRepository
      });

      entity.save()
      .then(() => {
        callback();
      })
      .catch((err) => {
        callback(err);
      })
    }, (err) =>{
      if(err) { throw(err); }

      console.log("DONE");

      process.exit(0);
    });

  })

  .catch((err) =>{
    console.log(err);

    process.exit(1);
  });
});
