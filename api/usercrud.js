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

router.put("/new", requiresAuth(), (req, res) => {
    if (!req.body.username|| !req.body.age || !req.body.realName) {
        res.send("not enough inputs")
        res.sendStatus(400)
        return
    }
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

router.put("/update", requiresAuth(), (req, res) => {
    db.updateUser(req.body.username, req.body.newAge, req.body.newRealName, (err, body) => {
        if (err) {
            console.log(err)
            res.sendStatus(500)
            res.send("something went wrong")
        } else {
            res.send("success")
        }
    })
})

router.delete("/delete", requiresAuth(), (req, res) => {
    db.deleteUser(req.body.username, (err) => {
        if (err) {
            res.sendStatus(500)
            res.send("something went wrong")
        } else {
            res.send("success")
        }
    })
})
module.exports.userCrudRouter = router
