const express = require('express')
const router = express.Router()
const { requiresAuth } = require('express-openid-connect')
const db = require('../lib/db')

router.use(express.json())
// get user via username
router.get('/:username', requiresAuth(), async (req, res) => {
  db.readUser(req.params.username).then(async (data) => {
    await res.send(JSON.stringify(data.Item))
  }).catch(async () => {
    await res.send(JSON.stringify({}))
  })
})
// create new user
router.put('/new', requiresAuth(), async (req, res) => {
  if (!req.body.username || !req.body.age || !req.body.realName) {
    res.send('not enough inputs')
    res.sendStatus(400)
    return
  }
  db.newUser(req.body.username, req.body.age, req.body.realName).then(() => {
    res.send('success')
  }).catch(() => {
    res.send('something went wrong')
    res.sendStatus(500)
  })
})
// update a user's info
router.put('/update', requiresAuth(), async (req, res) => {
  await db.updateUser(
    req.body.username,
    req.body.newAge,
    req.body.newRealName
  ).then(() => {
    res.send('success')
  }).catch(() => {
    res.send('something went wrong')
    res.sendStatus(500)
  })
})
// delete a user by id
router.delete('/delete', requiresAuth(), async (req, res) => {
  await db.deleteUser(req.body.username).then(() => {
    res.send('success')
  }).catch(() => {
    res.send('something went wrong')
    res.sendStatus(500)
  })
})
module.exports.userCrudRouter = router
