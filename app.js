'use strict';
const Server = require('./netServer/server')
const mongooseConnections = require('./mongoose-connection/connections')
//create servers
const jiuzhouMongooseConnection = mongooseConnections.userJiuzhouConnection

const jiuzhouServer = new Server('jiuzhou', 8433)

jiuzhouServer.setMongooseConnection(jiuzhouMongooseConnection)

jiuzhouServer.start()