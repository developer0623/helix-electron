import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
import _ from 'lodash';

const Schema = mongoose.Schema;

const IntentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  term: {
    type: String
  },
  samples: [String],
  application: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Application',
    required: true
  },
  slots: [{
    name: {
      type: String,
      required: true
    },
    custom_slot_type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CustomSlotType',
      required: true
    },
    required: {
      type: Boolean,
      required: true,
      default: false
    },
    prompts: [String],
    utterances: [String]
  }],
  is_built_in: {
    type: Boolean,
    required: true,
    default: false
  },
  is_quick_action: {
    type: Boolean,
    required: true,
    default: false
  }
}, {
  timestamps: true,
});

IntentSchema.methods.hasRequiredSlots = function(cb) {
  let result = false;

  _.each(this.slots, (slot) => {
    if(slot.required) {
      result = true;
    }
  });

  return result;
};
IntentSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Intent', IntentSchema);
