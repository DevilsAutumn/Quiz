const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const serverless = require("serverless-http");
global.bodyParser = require("body-parser");
const QuizSchema = require("./Quiz-schema");
require("dotenv").config();
const cors = require("cors");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.static(path.join(__dirname, "../build")));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({}));
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    keepAlive: true,
  })
  .then(() => {
    console.log("connected to db!");
  })
  .catch((err) => console.log(err));

//sending data from server to database
app.post("/submit", async (req, res) => {
  await QuizSchema.create(
    { Date: req.body.date, Quiz: req.body.quiz },
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log("data saved!");
      }
    }
  );
});

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`server listening on Port: ${PORT}`);
});

// module.exports.handler = serverless(app);
