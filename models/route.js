const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const users = require('./user');

router.get('/home', (req, res) => {
  res.render('home');
});

router.post('/home', (req, res) => {

  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password', 'Passwords don\'t match').equals(req.body.password_again);

  let errors = req.validationErrors();
  console.log(errors);

  if (errors) {
    res.render('home', { errors: errors });
  } else {

    let newUser =  users({
      username: req.body.username,
      password: req.body.password
    });

    bcrypt.genSalt(10, function(err, salt) {
  	    bcrypt.hash(newUser.password, salt, function(err, hash) {
  	        newUser.password = hash;
  	        newUser.save((err) => {
              if(err){ console.log(err); }
              console.log('inserted');
            });
  	    });
  	});

    res.redirect('login');

  }

});

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', (req, res) => {
  req.checkBody('l_username', 'Username is required').notEmpty();
  req.checkBody('l_password', 'Password is required').notEmpty();

  let errors = req.validationErrors();
  console.log(errors);
  if (errors) {
    res.render('login', { errors: errors });
  } else {

    users.find({ username: req.body.l_username }, (err, data) => {
      let errors = [];
      if (err) { console.log(err); }

      bcrypt.compare(req.body.l_password, data[0].password, function(err, isMatch) {
      	if(err){ console.log(err); }

      	if (isMatch) {
          console.log('login');
          // res.redirect('login');
          req.session.username = data[0].username;
          console.log(req.session.username);
      	  res.render('profile', { username: req.session.username });
      	} else {
          errors.push('Wrong details');
          res.render('login', { errors: errors });
        }

    	});

    });

  }

});

router.get('/random', (req, res) => {
  res.render('random', { username: req.session.username });
});

module.exports = router;
