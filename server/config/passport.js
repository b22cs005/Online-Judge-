const OAuth2Strategy = require("passport-google-oauth2").Strategy;
const googleuser = require("../models/googleusermodel");
const client_id = process.env.google_client_id;
const client_secret = process.env.google_client_secret;
const passport = require("passport");
require("dotenv").config();

passport.use(
    new OAuth2Strategy(
      {
        clientID: client_id,
        clientSecret: client_secret,
        callbackURL: "https://backend.codehack.me/auth/google/callback",
        scope: ["profile", "email"],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await googleuser.findOne({ googleId: profile.id });
          if (!user) {
            user = new googleuser({
              googleId: profile.id,
              displayName: profile.displayName,
              email: profile.emails[0].value,
            });
            await user.save();
          }
          return done(null, user);
        } catch (error) {
          return done(error, null);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await googleuser.findById(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });

  module.exports = passport;