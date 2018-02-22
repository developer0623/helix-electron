import _ from 'lodash';
import Client from '../../app/models/oauth_client';
import OAuthCode from '../../app/models/oauth_code';
import OAuthAccessToken from '../../app/models/oauth_token';
import User from '../../app/models/user';

function authenticateUser(email_address, password) {
  return new Promise((resolve, reject) => {
    User.findOne({ email_address })
    .then((user) => {
      if (!user) { reject(null); }

      user.verifyPassword(password, (err, isMatch) => {
        if(err) { reject(err); }
        if(!isMatch) { reject(null); }

        resolve(user);
      });
    })
    .catch((err) => {
      reject(err);
    });
  });
}
function authenticateClient(client_id, client_secret) {
  return new Promise((resolve, reject) => {
    Client.findOne({ client_id })
    .then((client) => {
      if (!client) {
        reject(null);
      }

      resolve(client);
    })
    .catch((err) => {
      reject(err);
    });
  });
}
function issueAuthCode(client, user, redirectUri) {
  return new Promise((resolve, reject) => {
    const auth_code = new OAuthCode({
      code: uid(16),
      client: client,
      redirect_uri: redirectUri,
      user: user
    });
    auth_code.save((err) => {
      if (err) { reject(err); }

      resolve(auth_code.code);
    });
  })
}
function uid(len) {
  var buf = []
    , chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    , charlen = chars.length;

  for (var i = 0; i < len; ++i) {
    buf.push(chars[getRandomInt(0, charlen - 1)]);
  }

  return buf.join('');
}
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const LinkAccountController = {
  LinkAccount: (req, res, next) => {
    const email_address = req.body.email_address;
    const password = req.body.password;
    const client_id = req.body.client_id;
    const client_secret = req.body.client_secret;
    const redirect_uri = req.body.redirect_uri;
    const state = req.body.state;

    authenticateUser(email_address, password)
    .then((user) => {
      authenticateClient(client_id, client_secret)
      .then((client) => {
        issueAuthCode(client, user, redirect_uri)
        .then((code) => {
          res.status(200).send({code: code});
        })
        .catch((err) => {
          console.log("reject issue " + err);

          res.status(401).send("Unauthorized");
        });
      })
      .catch((err) => {
        console.log("reject client" + err);

        res.status(401).send("Unauthorized");
      });
    })
    .catch((err) => {
      console.log("reject user " + err);

      res.status(401).send("Unauthorized");
    });
  },
  ExchangeCode: (req, res, next) => {
    const code = req.body.code;

    OAuthCode.findOne({code: code})
    .populate('client')
    .populate('user')
    .exec()
    .then((authCode) => {
      authCode.remove()
      .then(() => {
        const accessToken = new OAuthAccessToken({
          access_token: uid(256),
          refresh_token: uid(256),
          client: authCode.client,
          user: authCode.user
        });

        accessToken.save()
        .then(() => {
          res.status(200).send(accessToken)
        })
        .catch((err) => {
          res.status(401).send("Unauthorized");
        })
      })
      .catch((err) => {
        res.status(401).send("Unauthorized");
      })
    })
    .catch((err) => {
      res.status(401).send("Unauthorized");
    })
  }
}

export default LinkAccountController;
