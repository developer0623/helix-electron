import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const Schema = mongoose.Schema;

const SkillGroupSchema = new Schema({
  skill_group_name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  skill_group_arn: {
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
  }
}, {
  timestamps: true,
});

SkillGroupSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('SkillGroup', SkillGroupSchema);
