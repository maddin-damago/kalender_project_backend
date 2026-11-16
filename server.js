"use strict";

import express from "express";

const app = express();
const PORT = 1234;

app.listen(PORT, () => {
  console.log(`express listening at port `, PORT);
});
