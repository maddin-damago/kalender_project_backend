import { pool } from "../utils/db.js";

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

export async function getTermineOverview() {
  const conn = await pool.getConnection();
  const [terminRow] = await conn.execute(
    `SELECT k.nachname as Nachname, k.vorname as Vorname,  m.ma_name as MA, t.start_datum as Datum  FROM termin t
     JOIN kunde k ON k.id = t.kunde_id
     JOIN mitarbeiter m ON m.id = t.mitarbeiter_id;`,
  );

  return terminRow;
}
