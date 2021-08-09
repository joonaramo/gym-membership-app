const mongoose = require('mongoose');

const settingsSchema = mongoose.Schema({
  business_name: {
    type: String,
  },
  logo_url: {
    type: String,
  },
  alt_logo_url: {
    type: String,
  },
  welcome_email: {
    message: {
      type: String,
    },
    enabled: {
      type: Boolean,
      default: false,
    },
  },
  order_email: {
    message: {
      type: String,
    },
    enabled: {
      type: Boolean,
      default: false,
    },
  },
  maps: {
    api_key: {
      type: String,
    },
    lat: {
      type: Number,
    },
    lng: {
      type: Number,
    },
  },
  social_urls: {
    facebook: {
      type: String,
    },
    instagram: {
      type: String,
    },
    twitter: {
      type: String,
    },
  },
  last_updated: {
    type: Date,
  },
});

settingsSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Settings = mongoose.model('Settings', settingsSchema);

module.exports = Settings;
