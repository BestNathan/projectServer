'use strict';
const Server = require('./netServer/server')
const mongooseConnections = require('./mongoose-connection/connections')
const jiuzhouMongooseConnection = mongooseConnections.userJiuzhouConnection

const jiuzhouServer = new Server('jiuzhou', 8433)

jiuzhouServer.setMongooseConnection(jiuzhouMongooseConnection)

jiuzhouServer.start()