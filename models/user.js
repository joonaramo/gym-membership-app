const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  memberships: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Membership',
    },
  ],
  email: {
    type: String,
    unique: true,
    required: true,
    minlength: 3,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  phone_number: {
    type: String,
    required: true,
  },
  street_address: {
    type: String,
    required: true,
  },
  postal_code: {
    type: Number,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  birth_date: {
    type: Date,
    required: true,
  },
  passwordHash: String,
});

userSchema.plugin(uniqueValidator);

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash;
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
