const AWS = require('aws-sdk')
// set AWS Region
AWS.config.update({
  region: process.env.AWS_REGION || 'us-east-1'
})

// ddb client
const dynamodb = new AWS.DynamoDB()

const table = process.env.TABLE_NAME || 'arandomtablename'
// read user by id
module.exports.readUser = async function (username) {
  const params = {
    TableName: table,
    Key: {
      uname: {
        S: username
      }
    }
  }
  return dynamodb.getItem(params).promise()
}
// create new user
exports.newUser = (username, age, realName, resolve, reject) => {
  const params = {
    TableName: table,
    Item: {
      uname: {
        S: username
      },
      age: {
        S: age
      },
      real_name: {
        S: realName
      }
    }
  }
  return dynamodb.putItem(params).promise()
}
// update user
exports.updateUser = (username, newAge, newRealName, cb) => {
  const params = {
    ExpressionAttributeValues: {
      ':a': {
        S: newAge
      },
      ':r': {
        S: newRealName
      }
    },
    TableName: table,
    Key: {
      uname: {
        S: username
      }
    },
    UpdateExpression: 'SET age = :a, real_name = :r',
    ReturnValues: 'UPDATED_NEW'
  }
  return dynamodb.updateItem(params).promise()
}
// delete user
exports.deleteUser = (username, cb) => {
  console.log(username)
  const params = {
    TableName: table,
    Key: {
      uname: {
        S: username
      }
    }
  }
  return dynamodb.deleteItem(params).promise()
}
