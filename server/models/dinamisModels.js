const pool = require("../config/db");

const insertKategori = async (tipe, data) => {
  const result = await pool.query(
    `INSERT INTO kategoridatadinamis (tipe,data) 
                                    VALUES 
                                    ($1,$2) RETURNING *`,
    [tipe, data]
  );
  return result.rows;
};

const getKategori = async (tipe) => {
  const result = await pool.query(`SELECT * FROM kategoridatadinamis WHERE tipe = $1`, [tipe]);
  return result.rows;
};

const deleteKategori = async (data) => {
  const result = await pool.query(`DELETE FROM kategoridatadinamis WHERE data = $1`, [data]);
  return result.rows;
};

const getKategoriListNik = async (tipe) => {
  const result = await pool.query(
    `
    SELECT 
      datadinamisnik.id,
      datadinamisnik.nik,
      penduduk.nama,
      penduduk.alamat,
      datadinamisnik.keterangan
    FROM datadinamisnik 
    LEFT JOIN penduduk
    ON datadinamisnik.nik = penduduk.nik
    WHERE datadinamisnik.data = $1
    `,
    [tipe]
  );
  return result.rows;
};
const getKategoriListKK = async (tipe) => {
  const result = await pool.query(
    `
    SELECT 
      datadinamiskk.id,
      datadinamiskk.kk,
      penduduk.nik,
      penduduk.nama,
      penduduk.alamat,
      datadinamiskk.keterangan 
    FROM datadinamiskk 
    LEFT JOIN penduduk
    ON datadinamiskk.kk = penduduk.kk
    WHERE datadinamiskk.data = $1 AND penduduk.hubungan_keluarga = 'KEPALA KELUARGA'
    `,
    [tipe]
  );
  return result.rows;
};

const insertDataDinamisNik = async (nik, data, keterangan) => {
  const result = await pool.query(
    `INSERT INTO datadinamisnik (nik,data,keterangan)
                                    VALUES
                                    ($1,$2,$3) RETURNING *`,
    [nik, data, keterangan]
  );
  return result.rows;
};
const insertDataDinamisKK = async (kk, data, keterangan) => {
  const result = await pool.query(
    `INSERT INTO datadinamiskk (kk,data,keterangan)
                                    VALUES
                                    ($1,$2,$3) RETURNING *`,
    [kk, data, keterangan]
  );
  return result.rows;
};
const deleteDataDinamisNik = async (id) => {
  const result = await pool.query(`DELETE FROM datadinamisnik WHERE id = $1`, [id]);
  return result.rows;
};
const deleteDataDinamisKK = async (id) => {
  const result = await pool.query(`DELETE FROM datadinamiskk WHERE id = $1`, [id]);
  return result.rows;
};

const getDataDinamisByNik = async (nik) => {
  const result = await pool.query(
    `
    WITH individudata AS (
      SELECT * FROM datadinamisnik WHERE nik = $1
    )
    SELECT 
      kategoridatadinamis.data,
      COALESCE(individudata.keterangan, '-') AS keterangan
    FROM individudata
    RIGHT JOIN kategoridatadinamis
      ON kategoridatadinamis.data = individudata.data
    WHERE tipe = 'nik';
    `,
    [nik]
  );
  return result.rows;
};
const getDataDinamisByKK = async (kk) => {
  const result = await pool.query(
    `
    WITH kkdata AS (
      SELECT * FROM datadinamiskk WHERE kk = $1
    )
    SELECT 
      kategoridatadinamis.data,
      COALESCE(kkdata.keterangan, '-') AS keterangan
    FROM kkdata
    RIGHT JOIN kategoridatadinamis
      ON kategoridatadinamis.data = kkdata.data
    WHERE tipe = 'kk';
    `,
    [kk]
  );
  return result.rows;
};
module.exports = {
  insertKategori,
  getKategori,
  deleteKategori,
  getKategoriListNik,
  getKategoriListKK,
  insertDataDinamisNik,
  insertDataDinamisKK,
  deleteDataDinamisNik,
  deleteDataDinamisKK,
  getDataDinamisByNik,
  getDataDinamisByKK,
};
