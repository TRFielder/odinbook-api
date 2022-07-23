const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/user');

// PassportJS strategy setup

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: 'https://localhost:3000/api/user/auth/facebook/callback',
      profileFields: ['id', 'name', 'emails', 'photos'],
    },
    (accessToken, refreshToken, profile, done) => {
      if (profile.emails === undefined) {
        console.log('No email found');
      }
      console.log({
        username: profile.id,
        firstname: profile.name.givenName,
        middlename: profile.name.middleName,
        surname: profile.name.familyName,
        avatar_URL: profile.photos[0].value,
      });
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
