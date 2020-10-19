const awilix = require('awilix')

const container = awilix.createContainer()

container.register({
    cors: awilix.asValue(require('cors')),
    express: awilix.asValue(require('express')),
    server: awilix.asClass(require('./src/server')).singleton(),
    studentsService: awilix.asClass(require('./src/services/studentsService')),
    studentModel: awilix.asValue(require('./src/models/student'))
})

module.exports = container