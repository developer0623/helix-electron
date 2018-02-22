import Application from '../app/models/application';
import Company from '../app/models/company';
import Repository from '../app/models/repository';

const RepositoryUpdateProcessor = {
  process: (data) => {
    return new Promise((resolve, reject) => {
      const repositoryId = data.repository_id;

      if(!repositoryId) { return reject(new Error("Repository Id Not Specified")); }

      Repository.findById(repositoryId)
      .then((repository) => {
        return Company.findById(repository.company);
      })
      .then((company) => {
        return Application.find({ owner: company._id })
      })
      .then((application) => {
        application.amazon_deployment_attributes.needs_build = true;

        application.save()
      })
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
    });
  }
}

module.exports = RepositoryUpdateProcessor;
