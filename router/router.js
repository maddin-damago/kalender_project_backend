import express from "express";
import { getTermine, getTermineOverview } from "../controller/controller.js";

export const router = new express.Router();

router.get("/termine", getTermine);
router.get("/termine-overview", getTermineOverview);
