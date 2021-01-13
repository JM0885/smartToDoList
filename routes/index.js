/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const dbParams = require('../lib/db.js');
const renderTaskElm = require('../server.js');


module.exports = (db) => {
  router.post('/', (req, res)=>{
    const newTodo = req.body.todo_title;
    const newCategory = req.body.add_category;
    const start_date = String(req.body.date);
    //adds category title to database and returns category_id
    db.query(`
    INSERT INTO categories(title)
    VALUES($1)
    RETURNING *;
    `,[newCategory]).then((data)=>{
      const categoryId = data.rows[0].id;


      //adds title, category_id and start_date to database
      db.query(`
      INSERT INTO todos(title, category_id, start_date)
      VALUES($1, $2, $3)
    `,[newTodo, categoryId, start_date])
    })
    res.redirect('/');

  //grabs title from todos table and loops through each title name
})

router.get('/', (req, res)=>{
    db.query(`
    SELECT title
    FROM todos
    `).then((data)=>{
      const title = data.rows;
      res.json(title);

    })

  })

  return router;
};



























