const pool = require("../config/db");
// Dashboard
const getIncomeTahun = async (tahun) => {
  const result = await pool.query("SELECT * FROM income WHERE tahun_anggaran = $1 ORDER BY jenis_income DESC", [tahun]);
  return result.rows;
};

const getOutcomeTahun = async (tahun) => {
  const result = await pool.query(
    "SELECT * FROM outcome WHERE tahun_anggaran = $1 ORDER BY jenis_outcome ASC, bulan DESC",
    [tahun]
  );
  return result.rows;
};

const insertIncome = async (jenis_income, sumber_dana, tahun_anggaran, jumlah, realisasi) => {
  const result = await pool.query(
    `INSERT INTO income (jenis_income, sumber_dana, tahun_anggaran,jumlah,realisasi) 
                                    VALUES 
                                    ($1,$2,$3,$4,$5) RETURNING *`,
    [jenis_income, sumber_dana, tahun_anggaran, jumlah, realisasi]
  );
  return result.rows;
};

const insertOutcome = async (jenis_outcome, sumber_dana, tahun_anggaran, bidang, bulan, realisasi) => {
  const result = await pool.query(
    `INSERT INTO outcome (jenis_outcome, sumber_dana, tahun_anggaran,bidang,bulan,realisasi)
                                    VALUES
                                    ($1,$2,$3,$4,$5,$6) RETURNING *`,
    [jenis_outcome, sumber_dana, tahun_anggaran, bidang, bulan, realisasi]
  );
  return result.rows;
};

// client

const getAPBNagari = async (tahun) => {
  const pendapatan = await pool.query(
    `
    select jenis_income, sum(jumlah) AS total_pendapatan, sum(realisasi) AS realisasi_pendapatan from income
    where tahun_anggaran = $1
    AND jenis_income = 'Pendapatan'
    group by jenis_income
    `,
    [tahun]
  );
  const pembiayaan = await pool.query(
    `
    select jenis_income, sum(jumlah) AS total_pembiayaan, sum(realisasi) AS realisasi_pembiayaan from income
    where tahun_anggaran = $1
    AND jenis_income = 'Pembiayaan'
    group by jenis_income 
    `,
    [tahun]
  );
  const belanja = await pool.query(
    `
    select jenis_outcome, sum(realisasi) AS realisasi_belanja from outcome
    where tahun_anggaran = $1
    AND jenis_outcome = 'Belanja'
    group by jenis_outcome
    `,
    [tahun]
  );
  const pengeluaran = await pool.query(
    `
    select jenis_outcome, sum(realisasi) AS realisasi_pengeluaran from outcome
    where tahun_anggaran = $1
    AND jenis_outcome = 'Pengeluaran'
    group by jenis_outcome
    `,
    [tahun]
  );

  const surplus_defisit =
    Number(pendapatan.rows[0]?.realisasi_pendapatan || 0) +
    Number(pembiayaan.rows[0]?.realisasi_pembiayaan || 0) -
    Number(belanja.rows[0]?.realisasi_belanja || 0) -
    Number(pengeluaran.rows[0]?.realisasi_pengeluaran || 0);

  return {
    pendapatan: pendapatan.rows,
    pembiayaan: pembiayaan.rows,
    belanja: belanja.rows,
    pengeluaran: pengeluaran.rows,
    surplus_defisit: surplus_defisit,
  };
};

const getAPBBulanan = async (tahun) => {
  const result = await pool.query(
    `
    WITH bulan_lengkap AS (
  SELECT generate_series(1, 12) AS bulan
),
bidang_lengkap AS (
  SELECT * FROM (VALUES
    ('PEMERINTAHAN'),
    ('PELAKSANAAN PEMBANGUNAN'),
    ('PEMBINAAN KEMASYARAKATAN'),
    ('PEMBERDAYAAN KEMASYARAKATAN'),
    ('PENANGGULANGAN BENCANA')
  ) AS bidang_list(bidang)
),
bidang_bulan AS (
  SELECT b.bidang, bl.bulan
  FROM bidang_lengkap b
  CROSS JOIN bulan_lengkap bl
)
SELECT 
  bb.bidang,
  bb.bulan,
  COALESCE(SUM(o.realisasi), 0) AS total_realisasi
FROM bidang_bulan bb
LEFT JOIN outcome o 
  ON o.bidang = bb.bidang 
  AND o.bulan = bb.bulan 
  AND o.jenis_outcome = 'Belanja'
  AND o.tahun_anggaran = $1
GROUP BY bb.bidang, bb.bulan
ORDER BY bb.bidang, bb.bulan;

    `,
    [tahun]
  );
  return result.rows;
};

const getIncomeById = async (id) => {
  const result = await pool.query("SELECT * FROM income WHERE id = $1", [id]);
  return result.rows;
};
const getOutcomeById = async (id) => {
  const result = await pool.query("SELECT * FROM outcome WHERE id = $1", [id]);
  return result.rows;
};
const updateIncomeById = async (id, jenis_income, sumber_dana, tahun_anggaran, jumlah, realisasi) => {
  const result = await pool.query(
    `UPDATE income SET jenis_income = $1, sumber_dana = $2, tahun_anggaran = $3, jumlah = $4, realisasi = $5 WHERE id = $6 RETURNING *`,
    [jenis_income, sumber_dana, tahun_anggaran, jumlah, realisasi, id]
  );
  return result.rows;
};
const updateOutcomeById = async (id, jenis_outcome, sumber_dana, tahun_anggaran, bidang, bulan, realisasi) => {
  const result = await pool.query(
    `UPDATE outcome SET jenis_outcome = $1, sumber_dana = $2, tahun_anggaran = $3, bidang = $4, bulan = $5, realisasi = $6 WHERE id = $7 RETURNING *`,
    [jenis_outcome, sumber_dana, tahun_anggaran, bidang, bulan, realisasi, id]
  );
  return result.rows;
};
const deleteIncomeById = async (id) => {
  const result = await pool.query("DELETE FROM income WHERE id = $1 RETURNING *", [id]);
  return result.rows;
};
const deleteOutcomeById = async (id) => {
  const result = await pool.query("DELETE FROM outcome WHERE id = $1 RETURNING *", [id]);
  return result.rows;
};
module.exports = {
  getIncomeTahun,
  getOutcomeTahun,
  insertIncome,
  insertOutcome,
  getAPBNagari,
  getAPBBulanan,
  deleteIncomeById,
  deleteOutcomeById,
  getIncomeById,
  getOutcomeById,
  updateIncomeById,
  updateOutcomeById,
};
