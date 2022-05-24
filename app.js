const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path");
const { DATABASE_URI } = require("./config.json");
const app = express();
const {
  createPollGetController,
  createPollPostController,
  getAllPolls,
  viewPollGetController,
  viewPollPostController,
} = require("./controllers/pollController");
// middleware
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configuration
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// Routes
app.get("/create", createPollGetController);
app.post("/create", createPollPostController);
app.get("/polls/:id", viewPollGetController);
app.post("/polls/:id", viewPollPostController);
app.get("/polls", getAllPolls);
app.get("/", (req, res) => res.render("home"));

// Database connection
mongoose
  .connect(DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    // Starting main application after successfully connected to database
    app.listen(process.env.PORT || 5050, () => {
      console.log(`Application ready on port ${process.env.PORT || 5050}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
