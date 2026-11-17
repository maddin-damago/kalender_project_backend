import {
  allTermine,
  allTermineOverview,
  kundeByEmail,
  newKunde,
} from "../service/service.js";

// GET ALL

export async function getTermine(req, res) {
  const termine = await allTermine();
  res.status(200).json(termine);
}

export async function getTermineOverview(req, res) {
  const termine = await allTermineOverview();
  res.status(200).json(termine);
}

// GET BY "ID"

export async function getKunde(req, res) {
  const kunde = await kundeByEmail(req.params.email);
  res.status(200).json(kunde);
}

// POST

export async function addNewKunde(req, res) {
  const kunde = await newKunde(req.body);
  res.status(201).json(kunde);
}
