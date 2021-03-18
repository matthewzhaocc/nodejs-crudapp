const { auth } = require("express-openid-connect")

exports.auth = auth({
    issuerBaseURL: process.env.ISSUERBASEURL,
    clientID: process.env.CLIENTID,
    clientSecret: process.env.CLIENTSECRET,
    baseURL: process.env.BASEURL,
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET
})
