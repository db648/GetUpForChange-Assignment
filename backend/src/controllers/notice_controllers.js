const express = require("express");
const router = express.Router();
const Notice = require("../models/notice_model")
const verify = require("../../verifyToken")

router.post("/",verify, async(req,res) => {
    try{
        console.log(req.body)
        const comment = await Notice.create(req.body)
        return res.status(200).send(comment)
    }
    catch(err){
        return res.status(500).send(err.message)
    }
})

router.get("/",verify, async(req,res) => {
    try{
        const comment = await Notice.find(req.body)
        return res.status(200).send(comment)
    }
    catch(err){
        return res.status(500).send(err.message)
    }
})

router.patch("/:id",verify, async(req,res) => {
    try{
        const comment = await Notice.findByIdAndUpdate(req.body)
        return res.status(200).send(comment)
    }
    catch(err){
        return res.status(500).send(err.message)
    }
})

router.delete("/:id",verify, async(req,res) => {
    try{
        const comment = await Notice.findByIdAndDelete(req.body)
        return res.status(200).send(comment)
    }
    catch(err){
        return res.status(500).send(err.message)
    }
})


module.exports=router
