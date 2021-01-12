/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const dbParams = require('../lib/db.js');




module.exports = (db) => {
  router.post('/', (req, res)=>{
    const newTodo = req.body.todo_title;
    db.query(`
    INSERT INTO todos(title)
    VALUES($1)
    `,[newTodo])
    console.log(newTodo);
  })


  return router;
};



























