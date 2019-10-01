const IoT = require('./services/IoT-API-Server')

module.exports = (app) => {
  // OpenAPI
  app.get('/',
    IoT.ping)
  app.get('/ping',
    IoT.ping)
  app.get('/init',
    IoT.init)
  app.get('/publish',
    IoT.publish)
}
