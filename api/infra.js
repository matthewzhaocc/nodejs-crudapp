// the infra routes for various status checks

const router = require("express").Router()

router.get("/health", (req, res) => {
    res.send("healthy")
})

module.exports.infraRouter = router