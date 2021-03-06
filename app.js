const express = require("express");
const app = express();
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;
const bodyParser = require("body-parser");

// routes
const users = require("./routes/api/users");
const tweets = require("./routes/api/tweets");

// models
const User = require("./models/User");


mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));
  
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
  
const passport = require('passport');
app.use(passport.initialize());
require('./config/passport')(passport);
  
app.get("/", (req, res) => {
  res.send("Welcome to MERN Twitter!");
});

app.use("/api/users", users);
app.use("/api/tweets", tweets);

const port = process.env.PORT || 5001;
app.listen(port, () => console.log(`Server is running on port ${port}`));
