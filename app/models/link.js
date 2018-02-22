import moment from 'moment';
import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const Schema = mongoose.Schema;

const LinkSchema = new Schema({
  link_type: {
    type: String,
    required: true
  },
  email_address: {
    type: String
  },
  url: {
    type: String,
    required: true
  },
  expiration_date: {
    type: Date
  },
  opened: {
    type: Boolean,
    required: true,
    default: false
  },
  expired: {
    type: Boolean,
    required: true,
    default: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
}, {
  timestamps: true,
});

LinkSchema.plugin(mongoosePaginate);

LinkSchema.virtual('isExpired').get(function (){
    return moment().isAfter(this.expiration_date);
});

module.exports = mongoose.model('Link', LinkSchema);
