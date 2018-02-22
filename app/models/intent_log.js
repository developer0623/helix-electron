import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const Schema = mongoose.Schema;

const IntentLogSchema = new Schema({
  type: {
    type: String,
    required: true
  },
  intent_name: {
    type: String
  },
  slots: [{
    key: {
      type: String,
      required: true
    },
    value: {
      type: String
    }
  }],
  application_id: {
    type: String,
    required: true
  },
  session_id: {
    type: String,
    required: true
  },
  request_id: {
    type: String,
    required: true
  },
  user_id: {
    type: String
  },
  locale: {
    type: String,
    required: true
  },
  raw_request: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  raw_response: {
    type: mongoose.Schema.Types.Mixed,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  application: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Application',
    required: true
  },
  prompt: {
    type: String,
  },
  reprompt: {
    type: String
  },
  success: {
    type: Boolean,
    default: false,
    required: true
  }
}, {
  timestamps: true,
});

IntentLogSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('IntentLog', IntentLogSchema);
