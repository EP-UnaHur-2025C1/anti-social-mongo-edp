const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text: String,
  visible: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Comment', CommentSchema)
