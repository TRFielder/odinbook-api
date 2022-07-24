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
      // My own facebook profile doesn't come with an email associated. This is a solution
      if (profile.emails === undefined) {
        User.findOrCreate(
          { username: profile.id },
          {
            firstname: profile.name.givenName,
            surname: profile.name.familyName,
            avatar_URL: profile.photos[0].value,
          },
          (err, user) => {
            console.log(`Logged in as user: ${user}`);
            done(null, user);
          },
        );
      } else {
        User.findOrCreate(
          { username: profile.id },
          {
            email: profile.emails[0].value,
            firstname: profile.name.givenName,
            surname: profile.name.familyName,
            avatar_URL: profile.photos[0].value,
          },
          (err, user) => {
            console.log(`Logged in as user: ${user}`);
            done(null, user);
          },
        );
      }
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
