const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const membershipSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
  },
  start_date: {
    type: Date,
    default: Date.now,
  },
  end_date: {
    type: Date,
    required: true,
  },
});

membershipSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

membershipSchema.plugin(mongoosePaginate);

const Membership = mongoose.model('Membership', membershipSchema);

module.exports = Membership;
