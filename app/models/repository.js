import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

import Entity from './entity';

const Schema = mongoose.Schema;

const RepositorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  default_response_format: {
    type: String
  },
  default_negative_response_format: {
    type: String
  },
  default_positive_response_format: {
    type: String
  },
  repository_type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RepositoryType',
    required: true
  },
  repository_group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RepositoryGroup'
  },
  data_set_type: {
    type: String
  },
  entity_type: {
    type: String
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
  attributes: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
    required: true
  },
  plugin_classname: {
    type: String
  },
  private: {
    type: Boolean,
    required: true,
    default: false
  },
  isArchived: {
    type: Boolean,
    required: false,
    default: false
  }
}, {
  timestamps: true,
});
RepositorySchema.pre('remove', function(doc) {
  Entity.remove({repository: this._id}).exec();

  next();
});

RepositorySchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Repository', RepositorySchema);
