const authRoutes = require('../routes/auth')
const vinylRoutes = require('../routes/vinyl')
const statsRoutes = require('../routes/stats')

module.exports = (app) => {
  app.use('/auth', authRoutes)
  app.use('/vinyl', vinylRoutes)
  app.use('/stats', statsRoutes)
}
