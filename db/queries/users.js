import db from "#db/client";
import bcrypt from "bcrypt";

export async function createUser(username, password) {
  const sql = `
    INSERT INTO users
        (username, password)
    VALUES
        ($1, $2)
    RETURNING *
    `;
  const hashedPassword = bcrypt.hash(password, 10);
  const {
    rows: [user],
  } = await db.query(sql, [username, hashedPassword]);
  return user;
}

export async function getUser(username, password) {
  const sql = `
    SELECT * FROM users WHERE username = $1;
    `;
  const {
    rows: [user],
  } = await db.query(sql, [username]);

  const isUser = bcrypt.compare(password, user.password);
  if (!isUser) return null;

  return user;
}

export async function getUserById(userId) {
  const sql = `
    SELECT * FROM users WHERE id = $1;
    `;
  const {
    rows: [user],
  } = await db.query(sql, [userId]);
  return user;
}
