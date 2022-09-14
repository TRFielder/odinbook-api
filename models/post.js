const mongoose = require('mongoose');

const { Schema } = mongoose;

const postSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  text: {
    type: String,
  },
  // Need to find a way to validate that URLs are URLs
  imgUrl: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

module.exports = mongoose.model('Post', postSchema);
