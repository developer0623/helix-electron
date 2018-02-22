import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CompanyUserSchema = new Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  email_address: {
    type: String,
    required: true,
  },
  phone_number: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  amazon_user_arn: {
    type: String
  },
  deleted: {
    type: Boolean,
    required: true,
    default: false
  }
});

module.exports = mongoose.model('CompanyUser', CompanyUserSchema);
