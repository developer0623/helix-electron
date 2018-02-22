import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const Schema = mongoose.Schema;

const LabSchema = new Schema({
  lab_name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  amazon_iam_role_arn: {
    type: String
  },
  aws_room_arn: {
    type: String
  },
  keywords: [{
    type: String
  }],
  // lab_members: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Repository',
  //   required: true
  // },
  laboratory_profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LaboratoryProfile'
  },
  skill_group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SkillGroup'
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

LabSchema.statics.getLab = function(user) {
  return new Promise((resolve, reject) => {
    if(!user) {
      resolve(null)
    }
    this.findOne({user: user})
    .populate('lab_members')
    .exec()
    .then((lab) => {
      resolve(lab);
    })
    .catch((err) => {
      reject(err);
    });
  });
}
LabSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Lab', LabSchema);
