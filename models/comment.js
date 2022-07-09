const mongoose = require('mongoose');

const { Schema } = mongoose;

const postSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  owningPost: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
  },
  text: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

module.exports = mongoose.model('Post', postSchema);
