import express from "express";
import {
  getTermine,
  getTermineOverview,
  getKunde,
  addNewKunde,
  getTimeslots,
  getMitarbeiterByLeistungsId,
  saveTermin,
} from "../controller/controller.js";

export const router = new express.Router();

router.get("/termine", getTermine);
router.get("/termine-overview", getTermineOverview);

router.post("/termine", saveTermin);

router.get("/kunde/:email", (req, res) => getKunde(req, res));
router.post("/kunde", addNewKunde);

router.get("/mitarbeiter/:leistungs_id", (req, res) =>
  getMitarbeiterByLeistungsId(req, res),
);

router.get("/timeslots/:maId/:date", (req, res) => getTimeslots(req, res));
