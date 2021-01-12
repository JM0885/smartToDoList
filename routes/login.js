const express = require('express');
const app = express();


//install cookie-session?
const cookieSession = require('cookie-session');
app.use(cookieSession({
  name: 'session',
  keys: ['onekey']
}));


//route to hacked login
app.get('/login/:id', (req, res) => {
  console.log(req.session);
  req.session.user_id = req.params.id;
  res.redirect('/');
});

