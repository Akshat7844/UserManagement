const express = require('express');
const router = express.Router();
const { jwtAuthmiddleware, generateJwt } = require("../middlewares/jwt");
const passport = require('../auth');
const {comparePassword, User} = require('./../models/User');
const { body, validationResult } = require('express-validator');
const { validateSignup, checkValidation } = require('./../middlewares/validation');

// route for login 
router.post("/login", async (req, resp) => {
    try {
  
      const { username, password } = req.body;
      const user = await User.findOne({ username: req.body.username});
                                        
      if (!user || !(await user.comparePassword(password))) {
        return resp.status(401).json({ error: "Invalid username or password" });
      }
  
      const payload = {
        id: user.id,
        username: user.username,
      };
  
      const token = generateJwt(payload);
      resp.json({ token: token });
    } 
    catch (err) {
      console.log(err);
      resp.status(500).json({error: 'Internal server error.'});
    }
  });


// to signup or add the user in the database

router.post("/signup",validateSignup,checkValidation, async (req, resp) => {
    try {
      const newUser = new User(req.body);
      const userSaved = await newUser.save();
  
      console.log("User Saved");
  
      const payload = {
        id: userSaved.id,
        username: userSaved.username,
        role : userSaved.role
      };
      const token = generateJwt(payload);
      console.log("Token : ", token);
  
      resp.status(200).json({ response: userSaved, token: token });
    } catch (err) {
      console.log({ err });
      resp.status(500).json({ err: "Internal Server Error" });
    }
  });
  

module.exports = router;