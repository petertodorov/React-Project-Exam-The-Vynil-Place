const express = require('express')
const Book = require('../models/Vinyl')
const User = require('../models/User')

const router = new express.Router()

router.get('/', (req, res) => {
  User
    .count({}).populate('likedVinyls').populate('dislikedVinyls')
    .then(users => {
      Vinyl
        .count({})
        .then(vinyls => {
          res.status(200).json({
            vinyls,
            users
          })
        })
    })
})

module.exports = router
