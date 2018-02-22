// Load required packages
import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
import bcrypt from 'bcrypt-nodejs';

// Define our user schema
var UserSchema = new mongoose.Schema({
  user_type: {
    type: String, //Admin, Organization, User
    required: true,
    default: 'User'
  },
  email_address: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  first_name: {
    type: String
  },
  last_name: {
    type: String
  },
  mobile_number: {
    type: String
  },
  mobile_number_verified: {
    type: Boolean,
    required: true,
    default: false
  },
  amazon_user_arn: {
    type: String
  },
  disabled: {
    type: Boolean,
    default: false
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company'
  }
}, {
  timestamps: true,
});

// Execute before each user.save() call
UserSchema.pre('save', function(callback) {
  var user = this;

  // Break out if the password hasn't changed
  if (!user.isModified('password')) return callback();

  // Password changed so we need to hash it
  bcrypt.genSalt(5, function(err, salt) {
    if (err) return callback(err);

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return callback(err);
      user.password = hash;
      callback();
    });
  });
});
UserSchema.methods.verifyPassword = function(password, cb) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};
UserSchema.set('toJSON', {
  getters: true,
  virtuals: true,
  transform: (doc, ret) => {
    delete ret.password;

    return ret;
  },
});

UserSchema.virtual('name').get(function() {
  return this.first_name + " " + this.last_name;
});

UserSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('User', UserSchema);
