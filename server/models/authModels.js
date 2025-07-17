const pool = require("../config/db");

// user
const findByUsername = async (username) => {
  const result = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
  return result.rows[0];
};
const findUserById = async (id) => {
  const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return result.rows[0];
};
const findByEmail = async (email) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  return result.rows[0];
};
const createUser = async (username, email, password, pin, role) => {
  const result = await pool.query(
    "INSERT INTO users (username,email,password,pin,role) VALUES ($1,$2,$3,$4,$5) RETURNING *",
    [username, email, password, pin, role]
  );
  return result.rows[0];
};
// token

const createToken = async (userId, token, expiresAt) => {
  const result = await pool.query("INSERT INTO tokens (user_id, token, expires_at) VALUES ($1, $2, $3) RETURNING *", [
    userId,
    token,
    expiresAt,
  ]);
  return result.rows[0];
};

const updateToken = async (userId, token, expiresAt) => {
  const result = await pool.query("UPDATE tokens SET token = $1, expires_at = $2 WHERE user_id = $3 RETURNING *", [
    token,
    expiresAt,
    userId,
  ]);
  return result.rows[0];
};

const findTokenByToken = async (token) => {
  const result = await pool.query("SELECT * FROM tokens WHERE token = $1", [token]);
  return result.rows[0];
};
const findTokenById = async (id) => {
  const result = await pool.query("SELECT * FROM tokens WHERE user_id = $1", [id]);
  return result.rows[0];
};

const deleteTokenByUserId = async (userId) => {
  await pool.query("DELETE FROM tokens WHERE user_id= $1", [userId]);
};

const getAllUsers = async () => {
  const result = await pool.query("SELECT id, username,email, role FROM users ORDER BY role ASC");
  return result.rows;
};
const deleteUserById = async (id) => {
  await pool.query("DELETE FROM users WHERE id = $1", [id]);
};
module.exports = {
  findByUsername,
  findByEmail,
  findUserById,
  createUser,
  createToken,
  updateToken,
  findTokenByToken,
  findTokenById,
  deleteTokenByUserId,
  getAllUsers,
  deleteUserById,
};
