var AWS = require("aws-sdk")
// set AWS Region
AWS.config.update({
    region: process.env.AWS_REGION || "us-east-1"
})

// ddb client
var docClient = new AWS.DynamoDB.DocumentClient()

var table = process.env.TABLE_NAME || "arandomtablename"

module.exports.readUser = function (username, cb) {
    var params = {
        TableName: table,
        Key: {
            "name": username
        }
    }
    docClient.get(params, (err, data) => {
        cb(err, data)
    })
    
}

exports.newUser = (username, age, realName, cb) => {
    var params = {
        TableName: table,
        Item: {
            "name": username,
            "age": age,
            "real_name": realName
        }
    }
    docClient.put(params, (err, data) => {
        cb(err, data)
    })
}

exports.updateUser = (username, age, realName, newUsername, newAge, newRealName, cb) => {
    var params = {
        TableName: table,
        Key: {
            "name": username,
            "age": age,
            "real_name": realName
        },
        UpdateExpression: "set name = :n, age = :a, real_name = :r",
        ExpressionAttributeValues: {
            ":n": newUsername,
            ":a": newAge,
            ":r": newRealName
        },
        ReturnValues: "UPDATED_NEW"
    }
    docClient.update(params, (err, data) => {
        cb(err, data)
    })
}

exports.deleteUser = (username, cb) => {
    var params = {
        TableName: table,
        Key: {
            "name": username
        }
    }
    docClient.delete(params, (err, _) => {
        cb(err)
    })
}