const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/user");
const authRouter = require("./routes/auth");
const verifyToken = require("./middleware/authJWT");

const { connection, prepareTables } = require("./js/databse");

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  const { DB_DB } = process.env;
  console.log("connected as id " + connection.threadId);

  //create and use db
  connection.query(`CREATE DATABASE IF NOT EXISTS ${DB_DB}`, (err, result) => {
    if (err) return console.log(err);
    connection.query(`USE ${DB_DB}`);

    prepareTables();
  });
});

const port = 8000;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);
app.use("/user", [verifyToken], usersRouter);
app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
