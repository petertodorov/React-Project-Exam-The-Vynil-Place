const mongoose = require('mongoose')
const encryption = require('../utilities/encryption')
const Vinyl = require('../models/Vinyl')

const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required'

let userSchema = new mongoose.Schema({
  email: {type: String, required: REQUIRED_VALIDATION_MESSAGE, unique: true},
  username: {type: String, required: REQUIRED_VALIDATION_MESSAGE},
  salt: String,
  password: String,
  roles: [String],
  likedVinyls: [{type: mongoose.Schema.Types.ObjectId, ref:'Vinyl', required: REQUIRED_VALIDATION_MESSAGE}],
  dislikedVinyls: [{type: mongoose.Schema.Types.ObjectId,ref:'Vinyl', required: REQUIRED_VALIDATION_MESSAGE}],

})

userSchema.method({
  authenticate: function (password) {
    return encryption.generateHashedPassword(this.salt, password) === this.password
  }
})

let User = mongoose.model('User', userSchema)

module.exports = User
module.exports.seedAdminUser = () => {
  User.find({}).then(users => {
    if (users.length > 0) return

    let salt = encryption.generateSalt()
    let password = encryption.generateHashedPassword(salt, 'admin')

    User.create({
      email: 'admin@admin.com',
      username: 'admin',
      salt: salt,
      password: password,
      roles: ['Admin']
    })
  })
}
