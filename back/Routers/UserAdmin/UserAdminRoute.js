const express = require("express");
const {User} = require("../../Models/User");
const router = express.Router();
router.route("/all").get(async (req, res)=>{
    // console.log("hi")
    User.find().then(response=>{
        // console.log(response)
        res.status(200).send(response)
    })
})

router.route("/:id").get(async (req, res)=>{
    // console.log("hi")
    User.findOne({_id:req.params.id}).then(response=>{
        // console.log(response)
        res.status(200).send(response)
    })
})

router.route("/:id").put(async (req, res)=>{
    // console.log("hi")
    const {fullname, email} = req.body
    User.findOneAndUpdate({_id:req.params.id}, {fullname, email}).then(async response=>{
        // console.log(response)
        res.status(200).send(response)
    })
})
router.route("/:id").delete(async (req, res)=>{
    // console.log("hi")
    User.findByIdAndDelete(req.params.id).then(async response=>{
        // console.log(response)
        res.status(200).send(response)
    })
})

module.exports = router;