import Entity from '../app/models/entity';
import * as entityTypes from '../app/models/types/entityTypes';

const KnowledgeBaseFactory = {
  createEntity: (name, attributes, company, repository) => {
    const entity = new Entity();

    entity.name = name;
    entity.type = entityTypes.KNOWLEDGEBASE;
    entity.attributes = (attributes) ? attributes : [];
    entity.owner = company;
    entity.owner_type = 'Company';
    entity.repository = repository;

    return entity.save();
  }
}

module.exports = KnowledgeBaseFactory;
