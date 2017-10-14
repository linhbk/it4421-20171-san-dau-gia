const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');

const route = express.Router();
const controller = require('./controller');

route.post('/createUser', (req, res) => {
  const userInfo = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    phone: req.body.phone,
    role: req.body.role,
  };
  console.log(userInfo);
  bcrypt.hash(userInfo.password, 10)
    .then((encodePassword) => {
      userInfo.password = encodePassword;
      controller.createUser(userInfo)
        .then((success) => {
          res.render('login', { login: false, username: '', message: 'Đăng kí thành công' });
        })
        .catch((err) => {
          res.render('login', { login: false, username: '', message: 'Đăng kí thất bại' });
        });
    });
});

route.post('/login', passport.authenticate('local'), (req, res) => {
  res.redirect('/');
});

route.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = route;