const express = require("express");
const mongoose = require("mongoose");

const app = express();

const db = require("./config/db");
//const model = require("./models/user");

mongoose
  .connect(db.url, { useNewUrlParser: true })
  .then(() => {
    console.log("Databse Connected Successfully!!");

    app.use(express.json());

    app.get("/", (req, res) => {
      res.send("Hello");
    });

    const strouter = require("./routes/user");
    app.use("/students", strouter);

    app.listen(3000, () => {
      console.log("Server is listening on port 3000");
    });
  })
  .catch((err) => {
    console.error("Could not connect to the database", err);
  });
