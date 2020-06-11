const passport = require('passport');



module.exports = (app) => {
    app.get('/google/login', passport.authenticate('google', { scope: ['profile']}));

    app.get('/google/login/callback', passport.authenticate('google'), function(req, res) {
        res.redirect('/main')
    })
}