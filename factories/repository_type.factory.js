import {
  Repository,
  RepositoryType
} from '../app/models';

const RepositoryFactory = {
  createRepositoryType: (entityType) => {
    const repositoryType = new RepositoryType();

    repositoryType.type_name = "Test";
    repositoryType.entity_type = entityType;

    return repositoryType.save();
  }
}

module.exports = RepositoryFactory;
