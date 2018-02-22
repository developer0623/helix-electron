import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
import async from 'async';

import Repository from './repository';
import RepositoryType from './repository_type';

const Schema = mongoose.Schema;

const CompanySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  amazon_iam_role_arn: {
    type: String
  },
  logo: {
    type: String
  },
  keywords: [{
    type: String
  }],
  contact: {
    first_name: {
      type: String
    },
    last_name: {
      type: String
    },
    email_address: {
      type: String
    },
    phone_number: {
      type: String
    }
  },
  physical_address: {
    address_1: {
      type: String
    },
    address_2: {
      type: String
    },
    city: {
      type: String
    },
    state: {
      type: String
    },
    zip_code: {
      type: String
    }
  },
  keywords: [String],
  amazon_room_profiles: [{
    room_profile_name: {
      type: String,
      required: true
    },
    room_profile_address: {
      type: String,
      required: true
    },
    room_profile_timezone: {
      type: String,
      required: true
    },
    room_profile_arn: {
      type: String
    }
  }],
  amazon_skill_groups: [{
    skill_group_name: {
      type: String
    },
    skill_group_description: {
      type: String
    },
    skill_group_arn: {
      type: String
    }
  }],
  amazon_oauth_token: {
    access_token: {
      type: String
    },
    access_token_expired_on: {
      type: Date
    },
    refresh_token: {
      type: String
    },
    refresh_token_expires_on: {
      type: Date
    }
  },
  organization_users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CompanyUser'
  }],
  onboarding_complete: {
    type: Boolean,
    required: true,
    default: false
  },
  active: {
    type: Boolean,
    required: true,
    default: 'true'
  }
}, {
  timestamps: true,
});
// CompanySchema.pre('save', function(callback) {
//   if(this.isNew) {
//     const company = this;
//
//     RepositoryType.find({})
//     .then((repository_types) => {
//       const repositoryIds = [];
//
//       async.each(repository_types, (repository_type, callback) => {
//         const repository = new Repository({
//           owner: company,
//           repository_type: repository_type
//         });
//
//         repository.save()
//         .then((repository) => {
//           repositoryIds.push(repository._id);
//
//           callback();
//         })
//         .catch((err) => {
//           callback(err);
//         })
//       }, (err) => {
//         if(err) { callback(err); }
//
//         company.repositories = repositoryIds;
//
//         callback();
//       });
//     })
//     .catch((err) => {
//       callback(err);
//     });
//   } else {
//     callback();
//   }
// });

CompanySchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Company', CompanySchema);
