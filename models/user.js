// Load required packages
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// Define our user schema
var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

// Execute before each user.save() call
UserSchema.pre('save', function(callback) {
  var user = this;

  // Break out if the password hasn't changed
  if (!user.isModified('password')){
    return callback();
    console.log('sejo-1');
    
  }

  // Password changed so we need to hash it
  bcrypt.genSalt(5, function(err, salt) {
    if (err) return callback(err);
    
    console.log('salt:::: '+salt);

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err){
        console.log('sejo-2');
        return callback(err);
      }
      
      console.log('hash:::: '+hash);
      user.password = hash;
      callback();
    });
    
  });
});

// Export the Mongoose model
module.exports = mongoose.model('User', UserSchema);