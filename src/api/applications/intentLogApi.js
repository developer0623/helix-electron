import superagent from 'superagent';
import authenticatedSuperAgent from '../authenticatedSuperAgent';
import { browserHistory } from 'react-router';

class IntentLogApi {

  static getAllIntentLogs(application_id, page) {
    return new Promise((resolve, reject) => {
        authenticatedSuperAgent('GET', `/api/applications/${application_id}/intent_logs?page=${page}`)
        .end(function(err, res) {
          if(err) {
            if(err.status === 401) {
              browserHistory.push('/admin/login');
            }
            return reject(err);
          }
          resolve(res.body);
        });
    });
  }
}

export default IntentLogApi;
