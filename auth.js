const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const User = require("./models/User");

passport.use(
    new localStrategy(async (username, password, done) => {
      try {
        console.log("User authenticated.");
        const user = await User.findOne({ username: username });
        if (!user) {
          return done(null, false, { message: "Incorrect username" });
        }
  
        const isPwdMatch = user.comparePassword(password);
        if (isPwdMatch) {
          
          return done(null, user);
        } else {
          return done(null, false, { message: "Incorrect Password." });
        }
      } catch (err) {
        return done(err);
      }
    })
  );

module.exports = passport;