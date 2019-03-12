const express = require('express')
const Book = require('../models/Vinyl')
const User = require('../models/User')
const Vinyl = require('../models/Vinyl')

const router = new express.Router()

router.get('/users', (req, res) => {
  User
    .find({}).populate('likedVinyls').populate('dislikedVinyls')
    .then(users => {
      res.status(200).json(users)
    }).catch(err=>console.log(errr))
})

module.exports = router
