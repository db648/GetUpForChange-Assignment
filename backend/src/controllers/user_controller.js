const express = require("express");
const router = express.Router();
const User = require("../models/user_model");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require('express-validator');


//REGISTER
router.post("/register",
body("username").notEmpty().withMessage("enter username"),
body("email").notEmpty().isEmail().withMessage("enter valid email"),
body('password').notEmpty().isLength({ min: 8 }).isAlphanumeric().withMessage("enter valid password"),
 async (req, res) => {
  try {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
      return res.status(400).json({ errors: errors.array() })
    } 
    let user1 = await User.findOne({ email: req.body.email });
    //if user is found send error
    if (user1) {
      console.log("found");
      return res.status(401).send({ status: "try another email" });
    }
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: CryptoJS.AES.encrypt(req.body.password, "notice").toString(),
    });
    const {password, ...details}=user
    return res.status(201).send(details);
  } catch (err) {
    return res.status(501).send(err);
  }
});

//LOGIN
router.post("/login",
body("email").notEmpty().isEmail().withMessage("enter email"),
body('password').notEmpty().isLength({ min: 8 }).isAlphanumeric().withMessage("enter password"),
 async (req, res) => {
  try {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
      return res.status(400).json({ errors: errors.array() })
    } 
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).send({ status: "user not found" });
    }

    const bytes = CryptoJS.AES.decrypt(user.password, "notice");
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

    if (originalPassword !== req.body.password) {
      return res.status(401).send({ status: "incorrect password" });
    }

    const accessToken = jwt.sign(
      { id: user._id },
      "notice"
    );

    const { password, ...info } = user._doc;

    res.status(201).send({ ...info, accessToken });
  } catch (err) {
    console.log("catch");
    return res.status(500).send(err);
  }
});

module.exports = router;