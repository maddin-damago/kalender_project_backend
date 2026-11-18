import {
  getAllTermine,
  getTermineOverview,
  getKundeByEmail,
  addNewKunde,
  getBookedAppointments,
  getMitarbeiterByLeistungsId,
  saveTermin,
} from "../repository/repository.js";
import { getNowDateTimeString } from "../utils/getNowDateTimeString.js";
import { generateTimeslots } from "../utils/generateTimeslots.js";

// GET ALL

export async function allTermine() {
  const termine = await getAllTermine();
  return termine;
}

export async function allTermineOverview() {
  const termine = await getTermineOverview();
  return termine;
}

// GET BY

export async function kundeByEmail(email) {
  const kunde = await getKundeByEmail(email);
  return kunde;
}

export async function mitarbeiterByLeisuntgsId(id) {
  const ma = await getMitarbeiterByLeistungsId(id);
  return ma;
}

// GET timeslots

export async function allTimeslots(maId, date) {
  const appointmentsMA = await getBookedAppointments(maId, date);

  return generateTimeslots("09:00:00", "18:00:00", appointmentsMA);
}

// POST

export async function newKunde(kunde) {
  const kunde_ = await addNewKunde(kunde);
  return kunde_;
}

export async function saveNewTermin(termin) {
  termin = {
    kunde: {
      vorname: "Klaus",
      nachname: "Kleber",
      email: "klaus.kleber@news.de",
      telefon: "1234/6543452",
    },
    ma: 1,
    leistungen: [1, 2],
    startdatum: "2026-12-31 09:00:00",
    enddatum: "tba",
  };

  const now = getNowDateTimeString();

  if (termin.startdatum < now) {
    return [];
  }

  const kunde = await getKundeByEmail(termin.kunde.email); // empty [] if not present
  let kundeId;

  if (kunde.length > 0) {
    kundeId = kunde[0].id;
  }

  if (kunde.length === 0) {
    const kunde = await addNewKunde(termin.kunde);
    kundeId = kunde.insertId;
  }

  console.log("kunde: " + kundeId);
  // const termin_ = await saveTermin(termin);
  return [];
}
