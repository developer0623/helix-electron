import superagent from 'superagent';
import authenticatedSuperAgent from '../authenticatedSuperAgent';

class RepositoryGroupApi {
  static getAllRepositoryGroups(company_id) {
    return new Promise((resolve, reject) => {
      let url = `/api/systems/repository_groups`;

      authenticatedSuperAgent('GET', url)
        .end(function(err, res) {
          if(err) {
            return reject(err);
          }
          resolve(res.body);
        });
    });
  }
}

export default RepositoryGroupApi;
