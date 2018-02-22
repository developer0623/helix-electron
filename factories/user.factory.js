import ClientFactory from './client.factory';
import OAuthToken from '../app/models/oauth_token';
import User from '../app/models/user';

const UserFactory = {
  createUser: () => {
    return new Promise((resolve, reject) => {
      const user = new User();
      user.email_address = "james@ibuildappsandstuff.co";
      user.password = "password";

      user.save()
      .then(() => {
        resolve(user);
      })
      .catch((err) => {
        reject(err);
      })
    });
  },
  createUserWithAccessToken: function() {
    return new Promise((resolve, reject) => {
      const accessToken = "oO0OmQDyCH5B0LtbuvMndzLdxD7UKPR1E5CC6tMbw8JJm1GEUE5EaClhcxn6dKBpa82nKQtqd0skjIDiHZHAjgoLdfacaVaXY9zEALag3UF92C0AnKUKcJdD8qZU5J1BOR2BUMxj4Ozw3bgjtU5sDktOpPkKGE8YXxDpUod1CtDwRYKdqqBnPCfDGlKCqCvsH4A3Bbcc6oc7XhEOEXHuHcTFzHOLIZLU5l6YlFyBRJDNwfJf0ZaUFvUarZ6HfcU6";

      ClientFactory.createClient()
      .then((client) => {
        this.createUser()
        .then((user) => {
          const oAuthToken = new OAuthToken();

          oAuthToken.user = user;
          oAuthToken.client = client;
          oAuthToken.access_token = accessToken;
          oAuthToken.save()
          .then(() => {
            resolve(user, oAuthToken)
          })
          .catch((err) => {
            reject(err);
          })
        })
        .catch((err) => {
          reject(err);
        });
      })
      .catch((err) => {
        reject(err);
      });
    });
  }
}

module.exports = UserFactory;
