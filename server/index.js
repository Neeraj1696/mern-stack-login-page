const express = require("express");

const app = express();

const cors = require("cors");

const cookieParser = require("cookie-parser");

require("./db/conn");

const router = require("./routes/router");
const { default: mongoose } = require("mongoose");

const port = 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(router);

app.listen(port, () => {
  console.log(`server is  started at port Number: ${port}`);
});
