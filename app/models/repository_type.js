import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const Schema = mongoose.Schema;

const RepositoryTypeSchema = new Schema({
  type_name: {
    type: String,
    required: true
  },
  entity_type: {
    type: String,
    required: true
  },
  intents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Intent'
  }],
  slot_type: {
    type: String
  }
});

RepositoryTypeSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('RepositoryType', RepositoryTypeSchema);
