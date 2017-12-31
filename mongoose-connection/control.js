module.exports = {
    insert: function (Model, opt) {
        return new Promise(function (resolve, reject) {
            var model = new Model(opt)
            model.save(function (err, doc) {
                if (err) {
                    //console.log("insertErr", err)
                    resolve("insertError")
                } else {
                    //console.log("insert", doc)
                    resolve(doc)
                }
            })
        })
    },
    update: function (Model, condition, update) {
        return new Promise(function (resolve, reject) {
            Model.update(condition, update, function (err, doc) {
                if (err) {
                    //console.log("insertErr", err)
                    resolve("updateError")
                } else {
                    //console.log("insert", doc)
                    resolve(doc)
                }
            })
        })
    },
    find: function (Model, condition, opt) {
        return new Promise(function (resolve, reject) {
            opt = opt || {}
            Model.find(condition, opt, function (err, doc) {
                if (err) {
                    //console.log("findByAcc", err)
                    resolve("findError")
                } else {
                    //console.log("findByAcc", doc)
                    if (doc.length) {
                        resolve(doc[0])
                    }
                    resolve("noData")
                }
            })
        })
    },
    delete: function (Model, condition) {
        return new Promise(function (resolve, reject) {
            Model.remove(condition, function (err, doc) {
                if (err) {
                    //console.log("delete", err)
                    resolve("deleteError")
                } else {
                    //console.log("delete", doc)
                    resolve(doc)
                }
            })
        })
    }

}
