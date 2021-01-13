// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || "development";
const express    = require("express");
const bodyParser = require("body-parser");
const sass       = require("node-sass-middleware");
const app        = express();
const morgan     = require('morgan');
const cookieSession = require('cookie-session');


// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect(console.log('SUCCESS! YOU HAVE CONNECTED!'));

app.use(cookieSession({
  name: 'session',
  keys: ['onekey']
}));

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Separated Routes for each Resource
const indexRoutes = require('./routes/index.js');
const loginRoute = require('./routes/login.js');


//"/home" path prefeix
app.use("/home", indexRoutes(db));
//"/login" path prefeix
app.use('/login', loginRoute(db));

// Home page
app.get("/", (req, res) => {
  const userId = req.session.user_id;
  db.query(`
  SELECT * FROM users
  WHERE id = $1;
  `, [userId])
  .then((data) => console.log("HERE IS THE LOGIN", data.rows))
  const templateVars = { userId };
  res.render("index", templateVars);
});

// module.exports = renderTaskElm = (task) => {
//   const taskList = $('.tasks');
//   taskList.append(createTaskElement(task));
//   taskList.children('.task:last-child').data(task);
// };

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

