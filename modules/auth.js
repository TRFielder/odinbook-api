const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/user');

// PassportJS strategy setup

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_API_KEY,
      clientSecret: process.env.FACEBOOK_API_SECRET,
      callbackURL: process.env.LOGIN_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOrCreate(
        { username: profile.id },
        {
          email: profile.emails[0].value,
          firstname: profile.name.givenName,
          surname: profile.name.familyName,
          middle_names: profile.name.middleName,
          avatar_URL: profile.photos[0].value,
        },
        (err, user) => done(err, user),
      );
    },
  ),
);

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
module.exports = passport;
