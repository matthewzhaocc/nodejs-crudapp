// the infra routes for various status checks

const router = require('express').Router()
// a API for responding to healthchecks
router.get('/health', async (req, res) => {
  await res.send('healthy')
  await res.sendStatus(200)
})

module.exports.infraRouter = router
