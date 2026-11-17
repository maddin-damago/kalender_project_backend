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

// GET BY "ID"

export async function getKundeByEmail(email) {
  const conn = await pool.getConnection();
  const [kundeRow] = await conn.execute("SELECT * FROM kunde WHERE email= ?", [
    email,
  ]);

  return kundeRow;
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
