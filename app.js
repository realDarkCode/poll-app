const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const app = express();
const { DATABASE_URI } = require("./config.json");

// middleware
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes

app.get("/", (req, res) => res.json({ message: "You're on root route" }));

// Database connection
mongoose
  .connect(DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    // Starting main application after successfully connected to database
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Application ready on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
