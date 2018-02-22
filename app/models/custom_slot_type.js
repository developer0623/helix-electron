import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const Schema = mongoose.Schema;

const CustomSlotTypeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  values: [{
    type: String
  }]
});

CustomSlotTypeSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('CustomSlotType', CustomSlotTypeSchema);
