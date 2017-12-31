const util = require('./util')
const handler = require('./handlers')


function Socket(_Socket, _Server) {
    this.socket = _Socket
    this.server = _Server
    this.mongooseConnection = this.server.getMongooseConnection()

    this.user = ""
    this.key = new Buffer(4)
    this.key.writeInt32BE(new Date().getTime() & 4294967295)
    this.socket.key = this.key
    this.socket.write(this.key)

    this.socket.setTimeout(60 * 1000)


    this.socket.on('data', this.onData.bind(this))
    this.socket.on('error', this.onError.bind(this))
    this.socket.on('close', this.onClose.bind(this))
    this.socket.on('timeout', this.onTimeout.bind(this))


    this.handleData = handler.handleData.bind(this)
    this.handleOnBroadcast = handler.handleOnBroadcast.bind(this)
    this.handleOnline = handler.handleOnline.bind(this)
    this.handleOnVersion = handler.handleOnVersion.bind(this)
    this.handleOnLogin = handler.handleOnLogin.bind(this)
    this.handleOnReg = handler.handleOnReg.bind(this)

}

Socket.prototype.handleData = function () {

}

Socket.prototype.handleOnBroadcast = function () {

}

Socket.prototype.handleOnline = function () {

}

Socket.prototype.handleOnVersion = function () {

}

Socket.prototype.handleOnLogin = function () {

}

Socket.prototype.handleOnReg = function () {

}

Socket.prototype.getUser = function () {
    return this.user
}

Socket.prototype.setUser = function (_user) {
    this.user = _user
}

Socket.prototype.send = function (data) {
    data = typeof data == 'number' ? data + '' : data
    let buf = Buffer.isBuffer(data) ? data : typeof data == 'string' ? Buffer.from(data) : Buffer.from(JSON.stringify(data))
    buf = util.bufTrans(buf, this.key)
    this.socket.write(buf)
}

Socket.prototype.close = function () {
    this.socket.destroy()
}

Socket.prototype.release = function () {
    this.server.removeSocket(this)
    this.socket = null
    this.server = null
    this.mongooseConnection = null
}

Socket.prototype.onData = function (data) {
    let buf = util.bufTrans(data, this.key)
    let str = buf.toString('utf8')
    console.log(this.user ? this.user : "" + "onData: " + str)
    this.handleData(str)
}
Socket.prototype.onError = function (err) {
    console.log("socket Error " + err.message + 'from' + this.socket.user)

}
Socket.prototype.onClose = function () {
    this.close()
    this.release()
    console.log(this.user + ' socket closed')
}
Socket.prototype.onTimeout = function () {

}

module.exports = Socket