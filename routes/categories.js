
const express = require('express');
const router = express.Router();
//enables dynamic retrieval of category titles
//to be used to render category specific api info
module.exports = (db) => {

  router.get('/', (req, res) => {
    db.query(`
    SELECT title
    FROM categories;
    `).then((data) => {
      const title = data.rows;
      res.json(title);
      console.log("Hitting categories", title[0]);
    })
  });

  return router;
};































