const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const blogRoute = require("./routes/blog");

const app = express();

//connect database
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connect success"))
  .catch(() => console.log("connect error"));

//middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//routes
app.use("/api", blogRoute);
app.use("/api", userRoutes);
app.use("/api", authRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`listening - port ${port}`);
});
