import {
  allTermine,
  allTermineOverview,
  kundeByEmail,
  newKunde,
  allTimeslots,
  mitarbeiterByLeisuntgsId,
  saveNewTermin,
  getLeistungen,
  mitarbeiterWithAllLeistungen,
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

export async function getAllLeistungen(req, res) {
  const leistungen = await getLeistungen();
  res.status(200).json(leistungen);
}

// GET BY

export async function getKunde(req, res) {
  const kunde = await kundeByEmail(req.params.email);
  res.status(200).json(kunde);
}

// export async function getMitarbeiterByLeistungsId(req, res) {
//   const ma = await mitarbeiterByLeisuntgsId(req.params.leistungs_id);
//   res.status(200).json(ma);
// }

export async function findMitarbeiterWithAllLeistungen(req, res) {
  console.log(req.params.leistungs_id);
  const ma = await mitarbeiterWithAllLeistungen(req.params.leistungs_id);
  res.status(200).json(ma);
}

// GET timeslots

export async function getTimeslots(req, res) {
  const timeslots = await allTimeslots(req.params.maId, req.params.date);
  res.status(200).json(timeslots);
}

// POST

export async function addNewKunde(req, res) {
  const kunde = await newKunde(req.body);
  res.status(201).json(kunde);
}

export async function saveTermin(req, res) {
  try {
    const termin = await saveNewTermin(req.body);
    res.status(201).json(termin);
  } catch (err) {
    res.status(400).json(err.message);
  }
}
