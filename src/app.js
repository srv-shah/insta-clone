const express = require('express');
const cookieParser = require('cookie-parser')

const app = express();
app.use(cookieParser());

const authRouter = require("./routes/auth.route")

app.use(express.json());  //middleware


// post -> /api/auth/register
app.use("/api/auth", authRouter);




module.exports = app