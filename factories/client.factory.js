import OAuthClient from '../app/models/oauth_client';

const ClientFactory = {
  createClient: () => {
    return new Promise((resolve, reject) => {
      const oAuthClient = new OAuthClient();
      oAuthClient.name = "Test Client";
      oAuthClient.client_id = "test123";
      oAuthClient.secret = "testSecret123";

      oAuthClient.save()
      .then(() => {
        resolve(oAuthClient);
      })
      .catch((err) => {
        reject(err);
      })
    });
  }
}

module.exports = ClientFactory;
