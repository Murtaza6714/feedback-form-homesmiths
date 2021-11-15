const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const { config } = require("./config");
var Connection = require("tedious").Connection;
// const axios = require("axios");
require("dotenv").config();
const inputParameters = require('./inputParameters')
const  { getDateTime } = require('./dateTime');
const { log } = require("console");
let port = process.env.PORT || 3000
7
app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

let i = 1;

app.get("", (req, res, next) => {
  res.redirect("/homesmiths-feedback-form");
});

app.get("/homesmiths-feedback-form", (req, res, next) => {
  res.render("feedback", {
    title: "Homesmiths Dubai Feedback Form",
  });
});

app.post("/homesmiths-feedback-form", async (req, res, next) => {
  const body = req.body;
  console.log(body);  
  
  // Connecion with database sql
  const myIp = req.ip
  const dateTimeNow = await getDateTime(new Date())
  var connection = new Connection(config);
  connection.on("connect", async function (err) {
    // If no error, then good to proceed.
    if (err) {
      return console.log("error", err);
    }
    console.log("Connected");
    await inputParameters( i++, body, connection, myIp, dateTimeNow );
  });
  await connection.connect();
  res.redirect("/thank-you");
});

app.get("/thank-you", (req, res, next) => {
  res.render("thank-you", {
    title: "Thank You",
  });
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.log("Server in up on port 3000");
});
