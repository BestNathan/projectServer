const MongooseConnector = require('./mongooseMutiple')

const VERSION_COLLECTION_NAME = 'versionManager'
const USER_JIUZHOU_COLLECTION_NAME = 'jiuzhouUser'

const VERSION_MODEL_NAME = 'Version'
const USER_MODEL_NAME = 'User'


const versionConnection = new MongooseConnector(VERSION_COLLECTION_NAME)
versionConnection.initSchema(VERSION_MODEL_NAME, {
    project: { type: String, index: true, unique: true },
    version: { type: String }
})

const userJiuzhouConnection = new MongooseConnector(USER_JIUZHOU_COLLECTION_NAME)
userJiuzhouConnection.initSchema(USER_MODEL_NAME, {
    username: { type: String, index: true, unique: true },
    password: { type: String },
    qq: { type: String },
    time: { type: String }
})


module.exports = {
    versionConnection,
    userJiuzhouConnection
}