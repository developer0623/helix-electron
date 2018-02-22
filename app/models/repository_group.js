import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const Schema = mongoose.Schema;

const RepositoryGroupSchema = new Schema({
  group_name: {
    type: String,
    required: true
  },
  repository_type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RepositoryType'
  },
  owner_type: {
    type: String,
    required: true,
    default: 'Company'
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'owner_type'
  },
  active: {
    type: Boolean,
    required: true,
    default: true
  }
});

RepositoryGroupSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('RepositoryGroup', RepositoryGroupSchema);
