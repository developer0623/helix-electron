import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const SystemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  attributes: [{
    key: {
      type: String,
      required: true
    },
    value: {
      type: mongoose.Schema.Types.Mixed
    }
  }]
});

module.exports = mongoose.model('System', SystemSchema);
