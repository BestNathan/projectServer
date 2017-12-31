function handleData(data) {
    var backObj = {}
    var obj = JSON.parse(data)
    try {
        switch (obj.action) {
            case 'broadcast':
                this.handleOnBroadcast(obj)
                break
            case 'online':
                this.handleOnline()
                break
            case 'login':
                this.handleOnLogin(obj)
                break
            case 'version':
                this.handleOnVersion()
                break
            case 'reg':
                this.handleOnReg(obj)
                break
            default:
                backObj.action = "on" + obj.action
                this.send(backObj)
                break
        }
    } catch (e) {
        console.log("onDataErr", e)
        backObj.action = "on" + obj.action
        backObj.msg = e.message ? e.message : e
        this.send(backObj)
        this.close()
    }

}

function handleOnBroadcast(data) {
    let obj = Object.assign({}, data)
    obj.action = 'onbroadcast'
    let message = {}
    message.action = 'onbroadcast'
    let = count = this.server.broadcast(obj)
    message.count = count
    this.send(message)
}

function handleOnline() {
    let = message = {}
    message.action = 'ononline'
    message.count = this.server.getSocketCount()
    this.send(message)
}

async function handleOnVersion() {
    let = message = {}
    message.action = 'onversion'
    message.version = await this.server.getVersion()
    this.send(message)
}

async function handleOnLogin(data) {
    let obj = Object.assign({}, data)
    let message = {}
    message.action = 'onlogin'
    let user = await this.mongooseConnection.find({
        username: obj.acc
    })
    if (typeof user != 'string') {
        if (user.username == obj.acc && user.password == obj.pwd) {
            message.status = "success"
            message.msg = "登录成功"
            message.time = user.time
            message.acc = user.username
            //登录成功 判断是否有其他客户端 再登录 如果有 则踢出
            if (this.server.socketExist(user.username)) {
                this.server.kickSocket(user.username)
            }
            //登录成功 判断是否到期 绑定acc 到 socket 对象 并加入集合
            if (parseInt(user.time) > new Date().getTime()) {
                this.user = user.username
                this.server.addSocket(this)
            }
        } else {
            message.status = "fail"
            message.msg = "账号密码错误"
        }
    } else {
        message.status = "fail"
        message.msg = user
    }
    this.send(message)
}

async function handleOnReg(data) {
    let obj = Object.assign({}, data)
    let message = {}
    message.action = 'onreg'
    let user = await this.mongooseConnection.find({
        username: obj.acc
    })
    if (typeof user !== 'string' && user.username == obj.acc) {
        message.status = 'fail'
        message.msg = '注册失败，账号已存在'
    } else {
        user = await this.mongooseConnection.insert({
            username: obj.acc,
            password: obj.pwd,
            qq: obj.qq,
            time: new Date().getTime() - 1000 + ''
        })
        console.log("reg", user)
        if (typeof user !== 'string' && user.username == obj.acc) {
            message.status = "success"
            message.msg = "注册成功"
        } else {
            message.status = "fail"
            message.msg = "注册失败"
        }
    }
    this.send(message)
}

module.exports = {
    handleData,
    handleOnBroadcast,
    handleOnline,
    handleOnVersion,
    handleOnLogin,
    handleOnReg
}