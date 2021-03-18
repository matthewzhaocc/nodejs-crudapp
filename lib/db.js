var AWS = require("aws-sdk")
// set AWS Region
AWS.config.update({
    region: process.env.AWS_REGION || "us-east-1"
})

// ddb client
var dynamodb = new AWS.DynamoDB

var table = process.env.TABLE_NAME || "arandomtablename"

module.exports.readUser = function (username, cb) {
    var params = {
        TableName: table,
        Key: {
            "uname": {
                "S": username
            }
        }
    }
    dynamodb.getItem(params, (err, data) => {
        cb(err, data)
    })
}

exports.newUser = (username, age, realName, cb) => {
    var params = {
        TableName: table,
        Item: {
            "uname": {
                S: username
            },
            "age": {
                S: age
            },
            "real_name": {
                S: realName
            }
        }
    }
    dynamodb.putItem(params, (err, data) => {
        cb(err, data)
    })
}

exports.updateUser = (username, newAge, newRealName, cb) => {
    console.log(newUsername)
    console.log(newAge)
    console.log(newRealName)
    var params = {
        ExpressionAttributeValues: {
            ":a": {
                "S": newAge
            },
            ":r": {
                "S": newRealName
            }
        },
        TableName: table,
        Key: {
            "uname": {
                "S": username
            }
        },
        UpdateExpression: "SET age = :a, real_name = :r",
        ReturnValues: "UPDATED_NEW"
    }
    dynamodb.updateItem(params, (err, data) => {
        cb(err, data)
    })
}

exports.deleteUser = (username, cb) => {
    console.log(username)
    var params = {
        TableName: table,
        Key: {
            "uname": {
                "S": username   
            }
    
        }
    }
    dynamodb.deleteItem(params, (err, _) => {
        console.log
        cb(err)
    })
}