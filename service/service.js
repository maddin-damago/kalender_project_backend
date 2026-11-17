import {
  getAllTermine,
  getTermineOverview,
  getKundeByEmail,
  addNewKunde,
  getBookedAppointments,
} from "../repository/repository.js";

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

// GET BY "ID"

export async function kundeByEmail(email) {
  const kunde = await getKundeByEmail(email);
  return kunde;
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
