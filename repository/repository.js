import { pool } from "../utils/db.js";

// GET ALL

export async function getAllTermine() {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query("SELECT * FROM termin");

    return rows;
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
}

export async function getBookedAppointments(maId, date) {
  const conn = await pool.getConnection();
  console.log(maId, date);
  try {
    const [rows] = await conn.execute(
      `SELECT mitarbeiter_id, TIME(start_datum) AS beginn, TIME(end_datum) AS ende FROM termin
                        WHERE DATE(start_datum) = ?
                        AND mitarbeiter_id = ?;`,
      [date, maId],
    );
    console.log(rows);
    return rows;
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
}

export async function getTermineOverview() {
  const conn = await pool.getConnection();
  const [terminRow] = await conn.execute(
    `SELECT k.nachname as Nachname, k.vorname as Vorname, m.ma_name as MA, t.start_datum as Datum FROM termin t
     JOIN kunde k ON k.id = t.kunde_id
     JOIN mitarbeiter m ON m.id = t.mitarbeiter_id;`,
  );

  return terminRow;
}

export async function getTermineForMaAndKunde(k_id, ma_id) {
  const conn = await pool.getConnection();
  const [terminRow] = await conn.execute(
    `SELECT * FROM termin
     WHERE kunde_id = ?
     AND mitarbeiter_id = ?;`,
    [k_id, ma_id],
  );

  return terminRow;
}

export async function getAllLeistungen() {
  const conn = await pool.getConnection();
  const [leistungenRow] = await conn.execute("SELECT * FROM leistungen");

  return leistungenRow;
}

// GET BY

export async function getKundeByEmail(email) {
  const conn = await pool.getConnection();
  const [kundeRow] = await conn.execute("SELECT * FROM kunde WHERE email= ?", [
    email,
  ]);

  return kundeRow;
}

export async function getMitarbeiter() {
  const conn = await pool.getConnection();
  const [mitarbeiter] = await conn.execute(`SELECT * FROM mitarbeiter`);

  return mitarbeiter;
}

export async function findMitarbeiterWithAllLeistungen(leistungIds) {
  if (!leistungIds || leistungIds.length === 0) return [];

  const query = `
  WITH matching_mitarbeiter AS (
  SELECT mitarbeiter_id
  FROM ma_leistungen
  WHERE leistung_id IN (?)
  GROUP BY mitarbeiter_id
  HAVING COUNT(DISTINCT leistung_id) = ?
  )
  SELECT m.id, m.ma_name
  FROM matching_mitarbeiter mm
  JOIN mitarbeiter m ON mm.mitarbeiter_id = m.id;
    `;

  // mysql2 automatically expands the first array into (?, ?, ...)
  // and the second parameter provides the count value for the HAVING clause.
  const [rows] = await pool.query(query, [leistungIds, leistungIds.length]);

  return rows;
}

export async function getLeistungById(id) {
  const conn = await pool.getConnection();
  const [leistungRow] = await conn.execute(
    "SELECT * FROM leistungen WHERE id= ?",
    [id],
  );

  return leistungRow;
}

// POST

export async function addNewKunde(kunde) {
  const conn = await pool.getConnection();
  const [kundeRow] = await conn.execute(
    "INSERT INTO kunde (vorname, nachname, email, telefon) VALUES (:vorname, :nachname, :email, :telefon)",
    kunde,
  );

  return kundeRow;
}

export async function saveTerminLeistung(t_id, l_id) {
  const conn = await pool.getConnection();
  const [terminRow] = await conn.execute(
    "INSERT INTO termin_leistungen (termin_id, leistung_id) VALUES (?, ?)",
    [t_id, l_id],
  );

  return terminRow;
}

export async function saveTermin(termin) {
  const conn = await pool.getConnection();
  const [terminRow] = await conn.execute(
    "INSERT INTO termin (kunde_id, mitarbeiter_id, start_datum, end_datum) VALUES (:kunde_id, :mitarbeiter_id, :start_datum, :end_datum)",
    termin,
  );

  return terminRow;
}
