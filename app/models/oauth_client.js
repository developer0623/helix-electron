import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import mongoosePaginate from 'mongoose-paginate';

const OAuthClientSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  client_id: {
    type: String,
    required: true,
  },
  secret: {
    type: String,
    required: true,
  }
});

module.exports.getClient = function(clientId, clientSecret) {
  return OAuthClient.findOne({ client_id: clientId, secret: clientSecret });
};

OAuthClientSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('OAuthClient', OAuthClientSchema);
