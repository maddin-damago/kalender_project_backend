import {
  getAllTermine,
  getTermineOverview,
  getKundeByEmail,
  addNewKunde,
} from "../repository/repository.js";

// GET ALL

export async function allTermine() {
  const termine = await getAllTermine();
  return termine;
}

export async function allTermineOverview() {
  const termine = await getTermineOverview();
  return termine;
}

// GET BY "ID"

export async function kundeByEmail(email) {
  const kunde = await getKundeByEmail(email);
  return kunde;
}

// POST

export async function newKunde(kunde) {
  const kunde_ = await addNewKunde(kunde);
  return kunde_;
}
