const mongoose = require('mongoose');
const findOrCreate = require('mongoose-find-or-create');

const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
  },
  firstname: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  about_text: {
    type: String,
  },
  // Need to find a way to validate that URLs are URLs
  avatar_URL: {
    type: String,
  },
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

// Enable find or create
userSchema.plugin(findOrCreate);

module.exports = mongoose.model('User', userSchema);
