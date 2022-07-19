const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const User = require('../models/user');

// PassportJS strategy setup

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/google/callback',
      passReqToCallback: true,
    },
    (request, accessToken, refreshToken, profile, done) => {
      User.findOrCreate(
        { username: profile.id },
        {
          firstname: profile.name.givenName,
          middle_names: profile.name.middleName,
          surname: profile.name.familyName,
          email: profile.emails[0].value,
          avatar_URL: profile.photos[0].value,
        },
      );
      return done(null, profile);
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
