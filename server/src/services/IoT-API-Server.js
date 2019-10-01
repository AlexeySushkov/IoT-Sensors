const deviceModule = require('../../../IoT/node_modules/aws-iot-device-sdk').device
let device = null

module.exports = {

  async ping (req, res) {
    res.status(200).send({
      status: 'OK'
    })
  },

  async init (req, res) {
    console.log('init')

    // Main try/catch block
    try {
      // A gateway defines the peers used to access Fabric networks
      device = deviceModule({
        keyPath: '../IoT/certs/node-private-key.pem',
        certPath: '../IoT/certs/node-cert.pem',
        caPath: '../IoT/certs/Amazon_Root_CA_1.pem',
        clientId: 'client-id-1',
        region: undefined,
        baseReconnectTimeMs: 4000,
        keepalive: 300,
        protocol: 'mqtts',
        port: 8883,
        host: 'a2lqo153m4zydi-ats.iot.eu-central-1.amazonaws.com',
        debug: true
      })

      console.log('Wait on event...')
      device.on('connect', function () { console.log('connect') })
      device.on('close', function () { console.log('close') })
      device.on('reconnect', function () { console.log('reconnect') })
      device.on('offline', function () { console.log('offline') })
      device.on('error', function () { console.log('error') })
      device.on('message', function (topic, payload) { console.log('message', topic, payload.toString()) })

      res.status(200).send({
        status: 'Status: Init OK'
      })
    } catch (error) {
      console.log(`Error processing transaction. ${error}`)
      console.log(error.stack)
      res.status(200).send({
        status: 'Init Error'
      })
    }
  },

  async publish (req, res) {
    console.log('publish, query: ', req.query)

    let temperature = req.query.temperature
    let humidity = req.query.humidity
    let pressure = req.query.pressure

    var now = new Date()

    try {
      console.log('publish: ')

      device.publish('my/dev-topic', JSON.stringify({
        time: now.toUTCString(),
        temperature: temperature,
        humidity: humidity,
        pressure: pressure
      }))

      res.status(200).send({
        status: 'Status: publish OK'
      })
    } catch (error) {
      console.log(`Error publish. ${error}`)
      console.log(error.stack)
      res.status(200).send({
        status: 'Status: publish exception'
      })
    }
  }
} // All functions
