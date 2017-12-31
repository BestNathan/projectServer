'use strict';
const Server = require('./netServer/server')
const jiuzhouMongooseConnection = require('./mongoose-connection/connections').userJiuzhouConnection

const jiuzhouServer = new Server('jiuzhou', 8433)

jiuzhouServer.setMongooseConnection(jiuzhouMongooseConnection)

jiuzhouServer.start()