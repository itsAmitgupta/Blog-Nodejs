const express = require("express");
const ejs = require("ejs");
const path = require("path");
const mongoose = require("mongoose");
const app = express();
const PORT = 8000;
const cookieParser = require('cookie-parser')
const {checkForAuthenticationCookie} = require('./Middlewares/authentication')
//Database Connection
mongoose
  .connect("mongodb://localhost:27017/blogify")
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err));

app.set("view engine", "ejs");
app.set("Views", path.resolve("./Views"));

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use(checkForAuthenticationCookie('token'))
app.use(express.static(path.resolve('./public')))

const Blog = require('./Models/blog.model')

app.get("/",async (req, res) => {
  const allBlog = await Blog.find({});
  res.render("home",{
    user:req.user,
    blogs:allBlog
  });
});


//Router

const userRouter = require("./Routes/user.route");
app.use("/user", userRouter);

const blogRouter = require("./Routes/blog.route")
app.use("/blog",blogRouter)

app.listen(PORT, () => {
  console.log(`server is started and running on http://localhost:${PORT}`);
});
