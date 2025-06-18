const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  nickName: { type: String, unique: true, required: true },
  email: String, 
  password: String,
  createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('User', userSchema)
