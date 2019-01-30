const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('User');
const { SECRET_OR_KEY } = require('../config/keys');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Authenticate using bearer token on Authentication header
  secretOrKey: SECRET_OR_KEY
};

module.exports = passport => {
  // Setting up the passport middleware
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload._id)
        .then(user => {
          if (user) {
            return done(null, user);
          } // This passes the user into req.user in the next callback

          return done(null, false);
        })
        .catch(err => done(err, false));
    })
  );
};
