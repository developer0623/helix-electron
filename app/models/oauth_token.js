import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
const Schema = mongoose.Schema;

const OAuthAccessTokenSchema = new Schema({
  access_token: {
    type: String,
    required: true
  },
  access_token_expired_on: {
    type: Date
  },
  refresh_token: {
    type: String
  },
  refresh_token_expires_on: {
    type: Date
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'OAuthClient',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true,
});

module.exports.saveToken = function(token, client, user) {
  var oAuthAccessToken = new OAuthAccessToken({
    access_token: token.accessToken,
    access_token_expires_on: token.accessTokenExpiresOn,
    client: client,
    refresh_token: token.refreshToken,
    refresh_token_expires_on: token.refreshTokenExpiresOn,
    user: user
  });

  return oAuthAccessToken.save();
};
module.exports.getAccessToken = function(bearerToken) {
  return OAuthAccessToken.findOne({ access_token: bearerToken });
};
module.exports.getRefreshToken = function(refreshToken) {
  return OAuthAccessTokenSchema.findOne({ refresh_token: refreshToken });
};

OAuthAccessTokenSchema.statics.getUser = function(accessToken) {
  return new Promise((resolve, reject) => {
    if(!accessToken) {
      resolve(null)
    }
    this.findOne({access_token: accessToken})
    .populate('user')
    .exec()
    .then((oAuthToken) => {
      if(!oAuthToken) {
        resolve(null);
      }
      resolve(oAuthToken.user);
    })
    .catch((err) => {
      reject(err);
    });
  });
}
OAuthAccessTokenSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('OAuthAccessToken', OAuthAccessTokenSchema);
