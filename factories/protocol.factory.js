import Entity from '../app/models/entity';
import * as entityTypes from '../app/models/types/entityTypes';

const ProtocolFactory = {
  createProtocol: (newProtocol, company, repository) => {
    const entity = new Entity({
      attributes: {}
    });

    entity.name = newProtocol.protocol_name;
    entity.type = entityTypes.PROTOCOL;
    entity.attributes.steps = newProtocol.steps;
    entity.owner = company;
    entity.owner_type = 'Company';
    entity.repository = repository;

    return entity.save();
  }
}

module.exports = ProtocolFactory;
