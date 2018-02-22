import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

// Define our token schema
var OAuthCodeSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true
  },
  redirect_uri: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'OAuthClient',
    required: true
  }
}, {
  timestamps: true,
});

OAuthCodeSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('OAuthCode', OAuthCodeSchema);
