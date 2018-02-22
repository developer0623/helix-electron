import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

import * as contextStatusTypes from './types/userContextStatusTypes';

const UserContextSchema = new mongoose.Schema({
  user_identifier: {
    type: String,
    required: true
  },
  device_identifier: {
    type: String
  },
  application_identifier: {
    type: String
  },
  status: {
    type: String,
    required: true,
    default: contextStatusTypes.IN_PROGRESS
  },
  intent: {
    type: String
  },
  type: {
    type: String
  },
  time_to_expire: {
    type: Date,
    required: true,
    default: Date.now
  },
  context: {
    type: mongoose.Schema.Types.Mixed
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
},
{
  timestamps: true,
});
UserContextSchema.statics.getLastInProgressContext = function(user_identifier) {
  return new Promise((resolve, reject) => {
    this.findOne({
      user_identifier,
      "status": contextStatusTypes.IN_PROGRESS,
      "time_to_expire": { $gte: new Date() }
    })
    .sort('-createdAt')
    .exec()
    .then((userContext) => {
      resolve(userContext);
    })
    .catch((err) => {
      reject(err);
    });
  });
}
UserContextSchema.statics.getContext = function(user_identifier, type) {
  return new Promise((resolve, reject) => {
    this.findOne({
      user_identifier,
      type,
      "status": contextStatusTypes.IN_PROGRESS,
      "time_to_expire": { $gte: new Date() }
    })
    .sort('-createdAt')
    .exec()
    .then((userContext) => {
      resolve(userContext);
    })
    .catch((err) => {
      reject(err);
    });
  });
}
UserContextSchema.statics.saveContext = function(user_identifier, device_identifier, application_identifier,
    intent, type, context, time_to_expire) {
  return new Promise((resolve, reject) => {
    const userContext = new this();

    userContext.user_identifier = user_identifier;
    userContext.device_identifier = device_identifier;
    userContext.application_identifier = application_identifier;
    userContext.intent = intent;
    userContext.type = type;
    userContext.context = context;
    userContext.time_to_expire = time_to_expire;

    userContext.save()
    .then(() => {
      resolve();
    })
    .catch((err) => {
      reject(err);
    });
  });
}

module.exports = mongoose.model('UserContext', UserContextSchema);
