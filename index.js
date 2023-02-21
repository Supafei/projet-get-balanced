const express = require('express');
const app = express();
require("dotenv").config();

const PORT = process.env.PORT ?? 3000;

app.use(express.urlencoded({ extended: true }));

const router = require("./app/router/router");

app.use(router);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});