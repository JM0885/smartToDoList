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

module.exports = (db) => {

  router.post('/', (req, res)=>{
    const addTask = req.body.addTask;
    let category = req.body.category;
    const start_date = String(req.body.start_date);
    taskInfo.fetchTaskInfo(addTask, category, (info) => {
      const a = info ? info.img_url : info;
      const b = info ? info.info_url : info;
      const c = info ? info.author : info;
      const d = info ? info.resto_title : info;
      db.query(`
    INSERT INTO todos(user_id, title, category_id, start_date, img_url, info_url, author, resto_title)
    VALUES(1, $1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
    `,[addTask, category, start_date, a, b, c, d]);
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

