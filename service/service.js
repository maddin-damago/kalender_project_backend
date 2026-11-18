import {
  getAllTermine,
  getTermineOverview,
  getKundeByEmail,
  addNewKunde,
  getBookedAppointments,
  getMitarbeiterByLeistungsId,
  getLeistungById,
  saveTermin,
  saveTerminLeistung,
} from "../repository/repository.js";
import { getNowDateTimeString } from "../utils/getNowDateTimeString.js";
import {
  generateTimeslots,
  timeToMinutes,
  minutesToTime,
} from "../utils/generateTimeslots.js";

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
  // termin = {
  //   kunde: {
  //     vorname: "Klaus",
  //     nachname: "Kleber",
  //     email: "klaus.kleber@news.de",
  //     telefon: "1234/6543452",
  //   },
  //   ma: 1,
  //   leistungen: [1, 2],
  //   startdatum: "2026-12-31 09:00:00",
  // };

  // Prüfen, ob Datum in der Vergangenheit liegt
  const now = getNowDateTimeString();

  if (termin.startdatum < now) {
    return [];
  }

  // Dauer des Termins anhand der leistungs ids zusammenrechnen
  let termindauerinMinuten = 0;

  for (let liD of termin.leistungen) {
    const leistung = await getLeistungById(liD);
    termindauerinMinuten += leistung[0].dauer_in_min;
  }

  // Prüfen, ob Kunde existiert, falls ja id setzen, falls nicht Kunde anlegen und insertId benutzen
  const kunde = await getKundeByEmail(termin.kunde.email); // empty [] if not present
  let kundeId;

  if (kunde.length > 0) {
    kundeId = kunde[0].id;
  }

  if (kunde.length === 0) {
    const kunde = await addNewKunde(termin.kunde);
    kundeId = kunde.insertId;
  }

  console.log("termindauer: " + termindauerinMinuten);

  // ende des termins berechnen -> startdatum am leerzeichen splitten, index 1 timeInMinutes umwandeln,
  // dauer des termins dazurechnen, per minutesInTime wieder umwandeln und dann mit dem Datums zusammen mit einem
  // leerzeichen joinen, um einen gültigen DateTime string zu erhalten

  const dateStringArrayForEndDateCalculation = termin.startdatum.split(" ");
  const endtime = minutesToTime(
    timeToMinutes(dateStringArrayForEndDateCalculation[1]) +
      termindauerinMinuten,
  );

  dateStringArrayForEndDateCalculation[1] = endtime;

  const endTimeDateString = dateStringArrayForEndDateCalculation.join(" ");

  console.log("endtime datestring :", endTimeDateString);

  // termin object speichern, insertId zurückbekommen und für die zwischentabelle termin_leistungen nutzen
  const terminToSave = {
    kunde_id: kundeId,
    mitarbeiter_id: termin.ma,
    start_datum: termin.startdatum,
    end_datum: endTimeDateString,
  };

  const termin_ = await saveTermin(terminToSave);

  for (let liD of termin.leistungen) {
    await saveTerminLeistung(termin_.insertId, liD);
  }

  return termin_;
}
