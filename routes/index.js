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
    const addTask = req.body.addTask;
    let category = req.body.category;
    const start_date = String(req.body.start_date);
    //adds category title to database and returns category_id

    // switch(category){
    //   case 'Movies':
    //     category = 1;
    //   break;
    //   case 'Shows':
    //     category = 2;
    //   break;
    //   case 'Books':
    //     category = 3;
    //   break;
    //   case 'Restaurants':
    //     category = 4;
    //   break;
    // }
    //
    db.query(`
    INSERT INTO todos(user_id, title, category_id, start_date)
    VALUES(1, $1, $2, $3)
    RETURNING *;
    `,[addTask, category, start_date]);
    res.redirect('/');

  //grabs title from todos table and loops through each title name
})

router.get('/', (req, res)=>{
    db.query(`
    SELECT *
    FROM todos
    `).then((data)=>{
      const title = data.rows;
      res.json(title);

    })

  })

  return router;
};





















