import superagent from 'superagent';
import authenticatedSuperAgent from '../authenticatedSuperAgent';

class ActivitiesApi {
  static getActivities(application_id, page) {
    return new Promise((resolve, reject) => {
      authenticatedSuperAgent('GET', `/api/applications/${application_id}/activities?page=${page}`)
        .end(function(err, res) {
          if(err) {
            return reject(err);
          }
          resolve(res.body);
        });
    });
  }
}

export default ActivitiesApi;
