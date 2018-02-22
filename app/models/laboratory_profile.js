import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const Schema = mongoose.Schema;

const LaboratoryProfileSchema = new Schema({
  profile_name: {
    type: String,
    required: true
  },
  street_address_1: {
    type: String,
    required: true
  },
  street_address_2: {
    type: String
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  zip_code: {
    type: String,
    required: true
  },
  timezone: {
    type: String
  },
  room_profile_arn: {
    type: String
  },
  owner_type: {
    type: String,
    required: true,
    default: 'Company'
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'owner_type'
  }
}, {
  timestamps: true,
});

LaboratoryProfileSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('LaboratoryProfile', LaboratoryProfileSchema);
