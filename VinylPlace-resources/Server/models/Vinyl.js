const mongoose = require('mongoose')

const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required'

let vinylSchema = new mongoose.Schema({
  title: {
    type: mongoose.Schema.Types.String,
    required: REQUIRED_VALIDATION_MESSAGE,
    unique: [true, 'Vinyl already exists.']
  },
  genre: {
    type: mongoose.Schema.Types.String,
    enum: {
      values: ['Rock', 'World', 'Alternative','Other'],
      message: 'Genre is invalid, choose among [Rock,World, Alternative or Other].'
    },
    default:'Other'
  },
  artist: { type: mongoose.Schema.Types.String},
  year: { type: mongoose.Schema.Types.Number },
  image: { type: mongoose.Schema.Types.String},
  likes: { type: mongoose.Schema.Types.Number, required: REQUIRED_VALIDATION_MESSAGE,default:0 },
  dislikes: { type: mongoose.Schema.Types.Number, required: REQUIRED_VALIDATION_MESSAGE,default:0 },
})

let Vinyl = mongoose.model('Vinyl', vinylSchema)

module.exports = Vinyl