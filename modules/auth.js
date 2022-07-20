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
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOrCreate(
        { username: profile.id },
        {
          firstname: profile.name.givenName,
          middle_names: profile.name.middleName,
          surname: profile.name.familyName,
          email: profile.emails[0].value,
          avatar_URL: profile.photos[0].value,
        },
        {},
        // The user has been found or created, return the user object
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
