import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const Schema = mongoose.Schema;

const ReminderSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  reminder_copy: {
    type: String,
    required: true
  },
  remind_at: {
    type: Date,
    required: true
  },
  delivered: {
    type: Boolean,
    required: true,
    default: false,
    index: true
  },
  delivered_at: {
    type: Date
  }
}, {
  timestamps: true,
});

ReminderSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Reminder', ReminderSchema);
