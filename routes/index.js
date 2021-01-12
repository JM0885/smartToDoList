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
  // router.get("/:id", (req, res) => {
  //   db.query(`SELECT *
  //   FROM users
  //   WHERE id = $1`, [req.params.id])
  //     .then(data => {
  //       const user = data.rows[0];
  //       res.json(user);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //       res
  //         .status(500)
  //         .json({ error: err.message });
  //     });
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



























