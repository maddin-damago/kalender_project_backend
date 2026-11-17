import express from "express";
import {
  getTermine,
  getTermineOverview,
  getKunde,
  addNewKunde,
} from "../controller/controller.js";

export const router = new express.Router();

router.get("/termine", getTermine);
router.get("/termine-overview", getTermineOverview);

router.get("/kunde/:email", (req, res) => getKunde(req, res));
router.post("/kunde", addNewKunde);
