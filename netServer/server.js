const net = require('net')
const Socket = require('./socket')
const versionConnection = require('../mongoose-connection/connections').versionConnection

function Server(projectName, port) {
    this.server = net.createServer()
    this.name = projectName
    this.port = port
    this.sockets = new Map()
    this.mongooseConnection = null

    this.server.on('connection', connectionHandler.bind(this))
    this.server.on('error', errorHandler.bind(this))
    this.server.on('listening', onListening.bind(this))
}

Server.prototype.getVersion = async function () {
    let version = (await versionConnection.find({
        project: this.name
    })).version
    return version
}

Server.prototype.setMongooseConnection = function (_MongooesConnection) {
    this.mongooseConnection = _MongooesConnection
}

Server.prototype.getMongooseConnection = function () {
    return this.mongooseConnection
}

Server.prototype.socketExist = function (user) {
    return this.sockets.has(user)
}

Server.prototype.kickSocket = function (user) {
    let socket = this.sockets.get(user)
    let message = {}
    message.action = "onkick"
    message.msg = "当前账号在其他软件登录，如有疑问请联系管理员"
    socket.send(message)
    socket.close()
    this.sockets.delete(user)
}

Server.prototype.addSocket = function (socket) {
    this.sockets.set(socket.getUser(), socket)
}

Server.prototype.removeSocket = function (socket) {
    let user = socket.getUser()
    user && this.sockets.get(user) == socket && this.sockets.delete(user)
}

Server.prototype.broadcast = function (data) {
    let count = 0
    this.sockets.forEach((socket) => {
        socket.send(data)
        count++
    })
    return count
}

Server.prototype.getSocketCount = function () {
    return this.sockets.size
}

Server.prototype.start = function () {
    this.server.listen(this.port)
}

function connectionHandler(socket) {
    console.log(this.name + " Server has a new Client ")
    new Socket(socket, this)
}
function errorHandler(err) {
    console.log(this.name + " Server Error " + err.message)
}

function onListening() {
    console.log(this.name + " Server is Listening on port " + this.port)
}

module.exports = Server