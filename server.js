"use strict";

import express from "express";
import cors from "cors";

import { router } from "./router/router.js";

const app = express();
const PORT = 1234;

app.use(express.json());

app.use(cors());

app.use("/api/v1", router);

app.listen(PORT, () => {
  console.log(`express listening at port `, PORT);
});
