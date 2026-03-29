const express = require('express');
const cookieParser = require('cookie-parser')

const app = express();
app.use(cookieParser());

const authRouter = require("./routes/auth.route")
const postRouter = require("./routes/post.route")

app.use(express.json());  //middleware


// post -> /api/auth/register
app.use("/api/auth", authRouter);

//post -> /api/post/
app.use("/api/post", postRouter)




module.exports = app