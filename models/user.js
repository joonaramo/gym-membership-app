const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const mongoosePaginate = require('mongoose-paginate-v2');

const userSchema = mongoose.Schema({
  memberships: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Membership',
    },
  ],
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
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
  is_admin: Boolean,
  passwordHash: String,
});

userSchema.plugin(uniqueValidator);

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    returnedObject.full_name = `${returnedObject.first_name} ${returnedObject.last_name}`;
    delete returnedObject._id;
    delete returnedObject.__v;
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash;
  },
});

userSchema.set('toObject', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    returnedObject.full_name = `${returnedObject.first_name} ${returnedObject.last_name}`;
    delete returnedObject._id;
    delete returnedObject.__v;
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash;
  },
});

userSchema.plugin(mongoosePaginate);

const User = mongoose.model('User', userSchema);

module.exports = User;
