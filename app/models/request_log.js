import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const Schema = mongoose.Schema;

const RequestLogSchema = new Schema({
  intent: {
    type: String,
    required: true
  },
  resolved: {
    type: Boolean,
    required: true,
    default: false
  },
  verified: {
    type: Boolean,
    required: true,
    default: false
  },
  request: {
    type: Schema.Types.Mixed
  }
}, {
  timestamps: true,
});


RequestLogSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('RequestLog', RequestLogSchema);
