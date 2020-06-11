const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const cors = require('cors');
const Bundler = require('parcel-bundler');
const keys = require('./config/keys');
const port = process.env.PORT || 5000;

const bundler = new Bundler('./public/index.html', {
    cache: false
});


mongoose.connect(keys.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true})
const connection = mongoose.connection;
connection.once('open', function() {
    console.log('Connected to database.')
})


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/.netlify/functions/', proxy({
    target: 'http://localhost:5000',
})
)
app.use(bundler.middleware());
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieSession({
    maxAge: 30 * 60 * 60 * 1000,
    keys: [keys.cookieKeys]
}))

require('./services/pass');
require('./user_routes/userRoute')(app);


app.listen(port, function() {
    console.log(`Listening on port ${port}`);
})