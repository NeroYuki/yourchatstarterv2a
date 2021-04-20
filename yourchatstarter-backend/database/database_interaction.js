const databaseConn = require('./database_connection.js')
const mongodb = require('mongodb')

module.exports.addRecord = (colName, record) => {
    return new Promise((resolve, reject) => {
        let col = databaseConn.getConnection().collection(colName)
        col.insertOne(record, function(err, res) {
            if (err) {
                console.err(err)
                reject()
            }
            else {
                resolve(res)
            }
        })
    }).catch()
}

module.exports.editRecords = (colName, query, action) => {
    return new Promise((resolve, reject) => {
        let col = databaseConn.getConnection().collection(colName)
        col.updateMany(query, action, function(err, res) {
            if (err) {
                console.err(err)
                reject()
            }
            else {
                resolve(res)
            }
        })
    }).catch()
}

module.exports.removeRecords = (colName, query) => {
    return new Promise((resolve, reject) => {
        let col = databaseConn.getConnection().collection(colName)
        col.deleteMany(query, function(err, res) {
            if (err) {
                console.err(err)
                reject()
            }
            else {
                resolve(res)
            }
        })
    }).catch()
}

module.exports.queryRecord = (colName, query) => {
    return new Promise((resolve, reject) => {
        let col = databaseConn.getConnection().collection(colName)
        col.find(query).toArray(function(err, res) {
            if (err) {
                console.err(err)
                reject()
            }
            else {
                resolve(res)
            }
        })
    }).catch()
}