const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const authRouter = require("./routes/auth");
const todoRouter = require("./routes/todo");
const parseCookie = require("cookie-parser");
const { authenticate } = require("./middleware/authenticate");

const app = express();
const PORT = process.env.PORT || 3000;
const CLUSTER_LINK = process.env.CLUSTER_LINK;

app.use(express.json());
app.use(parseCookie());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/auth", authRouter);
app.use("/todos", authenticate, todoRouter);

mongoose
  .connect(CLUSTER_LINK)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
