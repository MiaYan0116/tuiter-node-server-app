import mongoose from 'mongoose';

const schema = mongoose.Schema({
  tuitContent: String,
  likes: Number,
  liked: Boolean,
  disliked: Boolean,
  dislikes: Number,
  image: String,
  handle: String,
  time: String
}, {collection: 'tuits'});
export default schema;

