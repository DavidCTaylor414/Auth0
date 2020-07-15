const router = require('express').Router();
const passport = require('passport');
const flash = require('connect-flash');

// auth login
router.get('/login', (req, res) => {
    res.render('login', { user: req.user });
});

// auth logout
router.get('/logout', (req, res) => {
    // handle with passport
    res.send('logging out');
});

// auth with google+
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

// callback route for google to redirect to

router.get('/google/redirect', passport.authenticate('google', (req, res) => {
    console.log('REDIRECT FIRED');
    res.send('REDIRECT PAGE');
}));




// linkedin auth
router.get('/linkedin', passport.authenticate('linkedin'));

router.get('/linkedin/redirect', function(req, res, next) {
    passport.authenticate('linkedin', function(err, user, info) {
        // check for errors
        if (err) { return next(err); }

        // make sure there is a user returned
        if (!user) { return res.render('login'); }

        //log the user in
        req.logIn(user, function(err) {
        if (err) { return next(err); }


        console.log('we successfully passed the user to the redirect page')
        //console.log(user)

        return res.send(user);
      });
    })(req, res, next);
  });


module.exports = router;