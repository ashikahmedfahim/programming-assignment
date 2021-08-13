const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const ExpressError = require("./utilities/expressError");
const User =  require('./routes/users')
const UserPost =  require('./routes/usersPosts')
const Post =  require('./routes/posts')
const Auth =  require('./routes/auths')
require("dotenv").config();

const port = process.env.PORT || 5000;
const MongoDB = process.env.DB;
mongoose
  .connect(MongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((error) => console.log(error));

app.listen(port, () => {
  console.log("Server is running...");
});

app.use(cors());
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));     

app.use("/auth", Auth);
app.use("/posts", Post);
app.use("/users", User);
app.use("/users/:id/posts", UserPost);

app.use("*", (req, res, next) => {
  next(new ExpressError(404, "Page not found"));
});
 
app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Server Error" } = err;
  res.status(statusCode).json(message);
});
