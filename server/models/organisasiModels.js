const pool = require("../config/db");

const getWalinagari = async () => {
  const result = await pool.query("SELECT * FROM organisasi WHERE organisasi IN ('walinagari')");
  return result.rows;
};
const getPerangkatBamus = async () => {
  const result = await pool.query("SELECT * FROM organisasi WHERE organisasi IN ('perangkat', 'bamus')");
  return result.rows;
};

const getSingleOrganisasi = async (id) => {
  const result = await pool.query("SELECT * FROM organisasi WHERE id = $1", [id]);
  return result.rows;
};
module.exports = {
  getWalinagari,
  getPerangkatBamus,
  getSingleOrganisasi,
};
