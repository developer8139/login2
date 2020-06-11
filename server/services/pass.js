const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const key = require('../config/keys');
const User = require('../user_schema/user');


passport.serializeUser((user, done) => {
    done(null, user.id);
})


passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    })
})


passport.use(new GoogleStrategy({
        clientID: key.clientID,
        clientSecret: key.clientSecret,
        callbackURL: "http://localhost:5000/google/login/callback"
    },
    function (token, tokenSecret, profile, done) {
        User.findOne({ googleId: profile.id }).then(user => {
            if(user) { 
                done(null, user);
            } else {
                new User({ googleId: profile.id }).save()
                .then(newUser => {
                    done(null, newUser);
                })
            }
        })
    }
));