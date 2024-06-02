const express = require('express');
const router = express.Router();
const User = require('./../models/User')
const { jwtAuthmiddleware, generateJwt} = require("../middlewares/jwt");

const { rolemiddleware} = require("../middlewares/roleMiddleware");
const passport = require('../auth');


router.use(passport.initialize());
const authMiddleware = passport.authenticate("local", { session: false });

// role based authetication 
const roleMiddleware = (requiredRole) => {
    return async (req, resp, next) => {
        try {
            // Assuming your user object has a role property
            if (req.body && req.body.role === requiredRole) {
                next();
            } else {
                resp.status(403).send({ error: 'Access denied.' });
            }
        } catch (error) {
            console.error("Error in roleMiddleware:", error);
            resp.status(500).json({ error: "Internal server error" });
        }
    };
};


// route to ger all the users 
router.get('/getAll', roleMiddleware("Admin"),  async (req, resp) => {
    try {
      const users = await User.find();
      console.log("Users successfully fetched!");
      resp.status(200).json(users);
    } catch (err) {
      console.log("Error fetching the user details");
    }
  });

// route to update the user 
  router.put("/:_id", authMiddleware, async (req, resp) => {
    try {
      const newData = req.body;
      const savedData = await User.findByIdAndUpdate(req.params._id, newData, {
        new: true,
        runValidators: true,
      });
      console.log("User details updated");
      resp.status(200).json(savedData);
    } catch (err) {
      console.log("Error in updating records", err);
      resp.status(500).json({ err: "internal server error" });
    }
  });
  
 // route to delete the user 
  router.delete("/:_id", authMiddleware, async (req, resp) => {
    try {
      const toBeDeleted = await User.findByIdAndDelete(req.params._id);
      if (!toBeDeleted) {
        return resp.status(404).json({ error: "error deleting the record !" });
      }
      console.log("User details deleted!");
      resp.status(200).json({mesasge :'Person successfully deleted from database'});
    } catch (err) {
      console.log("Error in deleting records", err);
      resp.status(500).json({ err: "internal server error" });
    }
  });

  module.exports = router;