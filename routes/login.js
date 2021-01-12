const express = require('express');
const router  = express.Router();


//function route to hacked login
module.exports = (db) => {
  router.get('/:id', (req, res) => {
    console.log("LOGIN SUCCESS", req.session);
    req.session.user_id = req.params.id;
    res.redirect('/');
  })

  return router;
};
