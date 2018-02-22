import {
  Repository,
  RepositoryType
} from '../app/models';

const RepositoryFactory = {
  createRepository: (owner, entityType, attributes, name) => {
    const repositoryType = new RepositoryType();

    repositoryType.type_name = "Test";
    repositoryType.entity_type = entityType;

    return repositoryType.save()
    .then((savedRepositoryType) => {
      const repository = new Repository();

      repository.name = name || "Repository";
      repository.owner = owner;
      repository.repository_type = savedRepositoryType;
      repository.attributes = (attributes) ? attributes : {};
      repository.entity_type = entityType;

      return repository.save()
    });
  }
}

module.exports = RepositoryFactory;
