import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const Schema = mongoose.Schema;

const EntitySchema = new Schema({
  type: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  name_lower: {
    type: String
  },
  say_as: {
    type: String
  },
  display_as: {
    type: String
  },
  synonyms: [String],
  tags: [{
    type: String
  }],
  owner_type: {
    type: String,
    required: true,
    default: 'Company'
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'owner_type'
  },
  repository: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Repository'
  },
  reference_id: {
    type: String
  },
  attributes: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
    required: true
  }
}, {
  timestamps: true,
});
EntitySchema.pre('save', function(callback) {
  this.name_lower = this.name.toLowerCase();

  callback();
});
EntitySchema.statics.lookupValue = function(itemName, propertyName, callback) {
  return new Promise((resolve, reject) => {
    this.findOne({name: name})
    .then((entity) => {
      if(!entity) {
        resolve([false, null]);
      } else {
        const result = _.find(entity.attributes, { key: propertyName });

        if(!result) { resolve([true, null]); }

        resolve([true, result.value]);
      }
    })
    .catch((err) => {
      reject(err);
    });
  });
}
EntitySchema.plugin(mongoosePaginate);
EntitySchema.index({ repository: 1, type: -1 });

module.exports = mongoose.model('Entity', EntitySchema);
