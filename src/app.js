const express = require('express');
const cookieParser = require('cookie-parser')

const app = express();
app.use(express.json());  //middleware
app.use(cookieParser());


// requiring routers
const authRouter = require("./routes/auth.route")
const postRouter = require("./routes/post.route");
const userRouter = require('./routes/user.route');



// Using router:-
// post -> /api/auth/register
app.use("/api/auth", authRouter);
//post -> /api/post/
app.use("/api/post", postRouter);

app.use("/api/users", userRouter);




module.exports = app