const express = require("express")
const router = express.Router()
const { requiresAuth } = require("express-openid-connect")
const db = require("../lib/db")

router.use(express.json())

router.get("/:username", requiresAuth(), (req, res) => {
    db.readUser(req.params.username, (err, result) => {
        if (err) {
            res.send(JSON.stringify({})) 
        } else {
            res.send(JSON.stringify(result.Item))
        }
    })
})

router.post("/new", requiresAuth, (req, res) => {
    db.newUser(req.body.username, req.body.age, req.body.realName, (err, data) => {
        if (err) {
            console.log(err)
            res.sendStatus(500)
            res.send("something broke")
        } else {
            res.send("success")
        }
    })
})
module.exports.userCrudRouter = router
