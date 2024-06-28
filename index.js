const express = require("express");
const ejs = require("ejs");
const path = require("path");
const mongoose = require("mongoose");
const app = express();
const PORT = 8000;

//Database Connection
mongoose
  .connect("mongodb://localhost:27017/blogify")
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err));

app.set("view engine", "ejs");
app.set("Views", path.resolve("./Views"));

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.get("/", (req, res) => {
  res.render("home");
});

const userRouter = require("./Routes/user.route");
app.use("/user", userRouter);

app.listen(PORT, () => {
  console.log(`server is started and running on http://localhost:${PORT}`);
});
