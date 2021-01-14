/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const taskInfo = require('../services/taskInfo.js')
const dbParams = require('../lib/db.js');
const renderTaskElm = require('../server.js');
const { fetchTaskInfo } = require('../services/taskInfo.js');

module.exports = (db) => {

  router.post('/', (req, res)=>{
    const addTask = req.body.addTask;
    let category = req.body.category;
    const start_date = String(req.body.start_date);
    taskInfo.fetchTaskInfo(addTask, category, (info) => {
    db.query(`
    INSERT INTO todos(user_id, title, category_id, start_date, img_url)
    VALUES(1, $1, $2, $3, $4)
    RETURNING *;
    `,[addTask, category, start_date, info.img_url]);
    res.redirect('/');
  })
})





router.get('/', (req, res)=> {

    db.query(`
    SELECT *
    FROM todos
    `).then((data) => {
      const title = data.rows;
      res.json(title);

    })

  })

  return router;
};

