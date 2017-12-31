function bufTrans(buf, key) {
    var arr = []
    for (var i = 0; i < buf.byteLength; i++) {
        arr.push(buf.readUInt8(i) ^ key.readUInt8(i % 4))
    }
    return new Buffer(arr)
}

module.exports = {
    bufTrans
}