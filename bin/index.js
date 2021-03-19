// express app server
const express = require('express')
const morgan = require('morgan')

// import variables from .env
require('dotenv').config()

const app = express()
app.use(morgan('common'))
// use prometheus for stats

// import authN module
// app.use(require('../lib/auth').auth)
// infra router
app.use('/sys/', require('../api/infra').infraRouter)
// user crud router
app.use(
  `/api/${process.env.API_VERSION}/user`,
  require('../api/usercrud').userCrudRouter
)
// listen on $PORT or 3000
app.listen(process.env.PORT || 3000, () => {
  console.log(`application listening on ${process.env.PORT || 3000}`)
})
