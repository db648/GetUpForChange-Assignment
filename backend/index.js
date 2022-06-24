require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());
const connect = require("./src/config/db");
var cors = require("cors");

app.use(cors());

const user_controller = require("./src/controllers/user_controller");

app.use("/user", user_controller);

const PORT = process.env.PORT || 3001;

app.listen(PORT, async () => {
  try {
    await connect();
    console.log(`Server is running on ${PORT}`);
  } catch (err) {
    console.log(err);
  }
});