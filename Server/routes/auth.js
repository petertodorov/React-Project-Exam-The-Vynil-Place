const express = require('express')
const passport = require('passport')
const validator = require('validator')

const router = new express.Router()

function validateSignupForm (payload) {
  const errors = []
  let isFormValid = true
  let message = ''

  if (!payload || typeof payload.username !== 'string' || payload.username.trim().length < 3 || payload.username.trim().length > 10) {
    isFormValid = false
    errors.push ('Username must be 3 to 10 characters long')
  }

  if (!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email)) {
    isFormValid = false
    errors.push('Please provide a correct email address')
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 3) {
    isFormValid = false
    errors.push( 'Password must be at least 3 characters long')
  }

  return {
    success: isFormValid,
    message,
    errors
  }
}

function validateLoginForm (payload) {
  const errors = []
  let isFormValid = true
  let message = ''

  if (!payload || typeof payload.username !== 'string' || payload.username.trim().length < 3) {
    isFormValid = false
    errors.push( 'Please enter a valid username.')
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length <3) {
    isFormValid = false
    errors.push( 'Please enter a valid password.')
  }

  return {
    success: isFormValid,
    message,
    errors
  }
}

router.post('/signup', (req, res, next) => {
  const validationResult = validateSignupForm(req.body)
  if (!validationResult.success) {
    return res.status(200).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    })
  }

  return passport.authenticate('local-signup', (err) => {
    if (err) {
      console.log(err);
      return res.status(200).json({
        success: false,
        message: err,
      })
    }

    return res.status(200).json({
      success: true,
      message: 'You have signed up sucessfully',
    })
  })(req, res, next)
})

router.post('/signin', (req, res, next) => {
  const validationResult = validateLoginForm(req.body)
  if (!validationResult.success) {
    return res.status(200).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    })
  }

  return passport.authenticate('local-login', (err, token, userData) => {
    if (err) {
      console.log(err);
      if (err.name === 'IncorrectCredentials') {
        return res.status(200).json({
          success: false,
          message: err
        })
      }

      return res.status(200).json({
        success: false,
        message: 'Could not process the form.'
      })
    }

    return res.json({
      success: true,
      message: 'You have successfully logged in!',
      token,
      userData
    })

  })(req, res, next)
})

module.exports = router
  