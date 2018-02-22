import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const Schema = mongoose.Schema;

const MarketLeadSchema = new Schema({
  first_name: {
    type: String
  },
  last_name: {
    type: String
  },
  full_name: {
    type: String
  },
  company_name: {
    type: String
  },
  email_address: {
    type: String,
    required: true
  },
  message: {
    type: String
  },
  campaign: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
});

MarketLeadSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('MarketingLead', MarketLeadSchema);
