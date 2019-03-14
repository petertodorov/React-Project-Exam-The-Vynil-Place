const express = require('express')
const authCheck = require('../config/auth-check')
const Vinyl = require('../models/Vinyl')
const User = require('../models/User')
ObjectId = require('mongodb').ObjectID;
const router = new express.Router()

function validateVinylCreateForm(payload) {
  console.log(`this is payload:=>${payload}`);
  const errors = [];
  let isFormValid = true
  let message = ''

  if (!payload || typeof payload.title !== 'string' || payload.title.length < 3) {
    isFormValid = false
    errors.push('Title must be at least 3 symbols.')
  }
  if (!payload || typeof payload.artist !== 'string' || payload.artist.length < 1 || payload.artist.length > 50) {
    isFormValid = false
    errors.push('Artist name must be at least 1 symbol and less than 50 symbols.')
  }
  if (!payload || typeof payload.genre !== 'string' || !['Rock', 'World', 'Alternative', 'Other'].includes(payload.genre)) {
    isFormValid = false
    errors.push('Genre must be Rock, World, Alternative or Other.')
  }

  if (!payload || typeof payload.year !== 'number' || payload.year === 0) {
    isFormValid = false
    errors.push('Enter a valid year. ')
  }

  if (typeof payload.year === 'number') {
    if ((payload.year <= 1000 && payload.year !== 0)) {
      isFormValid = false
      errors.push('Wow, that is an old vinyl. Pleace check the year')
    } else if (payload.year > new Date().getFullYear()) {
      isFormValid = false
      errors.push('Way ahead of our time, are we? Pleace check the year')
    }
  }

  if (!payload || typeof payload.image !== 'string' || !(payload.image.startsWith('https://') || payload.image.startsWith('http://')) || payload.image.length < 7) {
    isFormValid = false
    errors.push('Please enter valid Image URL. Image URL must be at least 7 symbols.')
  }

  if (!isFormValid) {
    message = 'Check the form for errors.'
  }

  return {
    success: isFormValid,
    message,
    errors
  }
}

router.post('/create', authCheck, (req, res) => {

  const vinylObj = req.body
  if (req.user.roles.indexOf('Admin') > -1) {
    const validationResult = validateVinylCreateForm(vinylObj)
    if (!validationResult.success) {
      return res.status(200).json({
        success: false,
        message: validationResult.message,
        errors: validationResult.errors
      })
    }

    Vinyl
      .create(vinylObj)
      .then((createdVinyl) => {
        res.status(200).json({
          success: true,
          message: 'Vinyl added successfully.',
          data: createdVinyl
        })
      })
      .catch((err) => {
        console.log(err)
        let message = `Something went wrong :( ${err}`
        if (err.code === 11000) {
          message = 'Vinyl with the given title already exists.'
        }
        return res.status(200).json({
          success: false,
          message: message
        })
      })
  } else {
    return res.status(200).json({
      success: false,
      message: 'Invalid credentials!'
    })
  }
})

router.post('/edit/:id', authCheck, (req, res) => {
  if (req.user.roles.indexOf('Admin') > -1) {
    const vinylId = req.params.id
    const vinylObj = req.body
    const validationResult = validateVinylCreateForm(vinylObj)
    if (!validationResult.success) {
      return res.status(200).json({
        success: false,
        message: validationResult.message,
        errors: validationResult.errors
      })
    }

    Vinyl
      .findById(vinylId)
      .then(existingVinyl => {
        existingVinyl.title = vinylObj.title
        existingVinyl.artist = vinylObj.artist
        existingVinyl.genre = vinylObj.genre
        existingVinyl.year = vinylObj.year
        existingVinyl.likes
        existingVinyl.dislikes
        existingVinyl.image = vinylObj.image

        existingVinyl
          .save()
          .then(editedVinyl => {
            res.status(200).json({
              success: true,
              message: 'Vinyl edited successfully.',
              data: editedVinyl
            })
          })
          .catch((err) => {
            console.log(err)
            let message = 'Something went wrong :( Check the form for errors.'
            if (err.code === 11000) {
              message = 'Vinyl with the given title already exists.'
            }
            return res.status(200).json({
              success: false,
              message: message
            })
          })
      })
      .catch((err) => {
        console.log(err)
        const message = 'Something went wrong :( Check the form for errors.'
        return res.status(200).json({
          success: false,
          message: message
        })
      })
  } else {
    return res.status(200).json({
      success: false,
      message: 'Invalid credentials!'
    })
  }
})

router.get('/all', (req, res) => {
  Vinyl
    .find()
    .then(vinyls => {
      res.status(200).json(vinyls)
    })
})

router.post('/likes/:id', authCheck, (req, res) => {
  const id = req.params.id
  const userId = req.user._id
  Vinyl
    .findById(id)
    .then(vinyl => {
      if (!vinyl) {
        return res.status(200).json({
          success: false,
          message: 'Vinyl not found.'
        })
      } else {
        User.findById(userId).then((user) => {
          if (user.likedVinyls.indexOf(id) < 0 && user.dislikedVinyls.indexOf(id) < 0) {
            user.likedVinyls.push(ObjectId(id));
            vinyl.likes += 1;
            vinyl.save()
              .then((vinyl) => {
                res.status(200).json({
                  success: true,
                  message: 'New like added.',
                  data: vinyl
                })
              }).catch((err) => {
                console.log(err)
                const message = `Inner Something went wrong :( ${err}`
                return res.status(200).json({
                  success: false,
                  message: message
                })
              })

          } else{
            if (user.likedVinyls.indexOf(id) >= 0) {
              return res.status(200).json({
                success: false,
                message: 'You cannnot like the same vinyl twice.'
              })
            }
            if (user.dislikedVinyls.indexOf(id) >= 0) {
              return res.status(200).json({
                success: false,
                message: 'You have already disliked this vinyl.'
              })
            }
          } 

          // if (user.dislikedVinyls.indexOf(id) !== -1) {
          //   const index = user.dislikedVinyls.indexOf(id)
          //   user.dislikedVinyls.splice(index, 1)
          // }
          user.save()
        }).catch((error) => console.log(error));
      }
    }).catch((err) => {
      console.log(err)
      const message = `Outer Something went wrong :( ${err}`
      return res.status(200).json({
        success: false,
        message: message
      })
    })
})


router.post('/dislikes/:id', authCheck, (req, res) => {
  const id = req.params.id
  const userId = req.user._id
  Vinyl
    .findById(id)
    .then(vinyl => {
      if (!vinyl) {
        return res.status(200).json({
          success: false,
          message: 'Vinyl not found.'
        })
      }

      User.findById(userId).then((user) => {
        if (user.dislikedVinyls.indexOf(id) < 0 && user.likedVinyls.indexOf(id) < 0) {
          user.dislikedVinyls.push(ObjectId(id));
          vinyl.dislikes += 1;
          vinyl
            .save()
            .then((vinyl) => {
              res.status(200).json({
                success: true,
                message: 'New dislike added.',
                data: vinyl
              })
            })
            .catch((err) => {
              console.log(err)
              const message = 'Something went wrong :( Check the form for errors.'
              return res.status(200).json({
                success: false,
                message: message
              })
            })
        } else {
          if (user.dislikedVinyls.indexOf(id) >= 0) {
            return res.status(200).json({
              success: false,
              message: 'You cannnot dislike the same vinyl twice.'
            })
          }

          if (user.likedVinyls.indexOf(id) >= 0) {
            return res.status(200).json({
              success: false,
              message: 'You have alreay liked this vinyl.'
            })
          }
        }
        

        // if (user.likedVinyls.indexOf(id) !== -1) {
        //   const index = user.likedVinyls.indexOf(id)
        //   user.likedVinyls.splice(index, 1)
        // }
        user.save();
      }).then((error) => console.log(error))
    }).catch((err) => {
      console.log(err)
      const message = 'Something went wrong :( Check the form for errors.'
      return res.status(200).json({
        success: false,
        message: message
      })
    })
})


router.delete('/delete/:id', authCheck, (req, res) => {
  const id = req.params.id
  if (req.user.roles.indexOf('Admin') > -1) {
    Vinyl
      .findById(id)
      .then((vinyl) => {
        vinyl
          .remove()
          .then(() => {
            return res.status(200).json({
              success: true,
              message: 'Vinyl deleted successfully!'
            })
          })
      })
      .catch(() => {
        return res.status(200).json({
          success: false,
          message: 'Vinyl does not exist!'
        })
      })
  } else {
    return res.status(200).json({
      success: false,
      message: 'Invalid credentials!'
    })
  }
})

module.exports = router
