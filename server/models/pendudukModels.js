const pool = require("../config/db");

const getDataPenduduk = async (filters) => {
  const total = await pool.query("SELECT count(*) as total FROM penduduk");
  const totaldata = total.rows[0].total;
  const jumlahkk = await pool.query("SELECT COUNT(DISTINCT kk) AS totalkk FROM penduduk");
  const totalkk = jumlahkk.rows[0].totalkk;

  let query = `
        WITH pendudukkk AS (
        SELECT penduduk.*,kartukeluarga.latitude, kartukeluarga.longitude FROM penduduk
        LEFT JOIN kartukeluarga
        ON penduduk.kk = kartukeluarga.kk )
      
        SELECT *, CONCAT(
        EXTRACT(YEAR FROM AGE(NOW(), tanggal_lahir)), ' Tahun, ',
        EXTRACT(MONTH FROM AGE(NOW(), tanggal_lahir)), ' Bulan'
    ) AS umur FROM pendudukkk WHERE 1=1`;
  const values = [];
  if (filters.nik) {
    query += " AND nik ILIKE $1";
    values.push(`%${filters.nik}%`);
  }
  if (filters.kk) {
    query += ` AND kk ILIKE $${values.length + 1}`;
    values.push(`%${filters.kk}%`);
  }
  if (filters.nama) {
    query += ` AND nama ILIKE $${values.length + 1}`;
    values.push(`%${filters.nama}%`);
  }
  if (filters.jenis_kelamin) {
    query += ` AND jenis_kelamin = ANY(string_to_array($${values.length + 1}, ','))`;
    values.push(filters.jenis_kelamin);
  }
  if (filters.tanggal_lahir_min) {
    query += ` AND tanggal_lahir > $${values.length + 1}`;
    values.push(filters.tanggal_lahir_min);
  }

  if (filters.tanggal_lahir_max) {
    query += ` AND tanggal_lahir < $${values.length + 1}`;
    values.push(filters.tanggal_lahir_max);
  }
  if (filters.nama_ibu) {
    query += ` AND nama_ibu ILIKE $${values.length + 1}`;
    values.push(`%${filters.nama_ibu}%`);
  }
  if (filters.nama_ayah) {
    query += ` AND nama_ayah ILIKE $${values.length + 1}`;
    values.push(`%${filters.nama_ayah}%`);
  }
  if (filters.status_perkawinan) {
    query += ` AND status_perkawinan = ANY(string_to_array($${values.length + 1}, ','))`;
    values.push(filters.status_perkawinan); // Masukkan string "a,b"
  }
  if (filters.golongan_darah) {
    query += ` AND golongan_darah = ANY(string_to_array($${values.length + 1}, ','))`;
    values.push(filters.golongan_darah); // Masukkan string "a,b"
  }
  if (filters.agama) {
    query += ` AND agama = ANY(string_to_array($${values.length + 1}, ','))`;
    values.push(filters.agama);
  }
  if (filters.pendidikan) {
    query += ` AND pendidikan = ANY(string_to_array($${values.length + 1}, ','))`;
    values.push(filters.pendidikan);
  }
  if (filters.pekerjaan) {
    query += ` AND pekerjaan = ANY(string_to_array($${values.length + 1}, ','))`;
    values.push(filters.pekerjaan);
  }
  if (filters.alamat) {
    query += ` AND alamat ILIKE $${values.length + 1}`;
    values.push(`%${filters.alamat}%`);
  }
  if (filters.dusun) {
    query += ` AND dusun = ANY(string_to_array($${values.length + 1}, ','))`;
    values.push(filters.dusun);
  }
  if (filters.jorong) {
    query += ` AND jorong = ANY(string_to_array($${values.length + 1}, ','))`;
    values.push(filters.jorong);
  }
  if (filters.order_by) {
    query += ` ORDER BY ${filters.order_by}`;
    if (filters.order_direction) {
      query += ` ${filters.order_direction.toUpperCase()}`;
    }
  }

  const result = await pool.query(query, values);
  const resultscount = result.rowCount;
  let totalpages = 1;
  let currentpage = 1;
  if (filters.limit) {
    query += ` LIMIT $${values.length + 1}`;
    values.push(`${filters.limit}`);
    if (filters.page) {
      currentpage = parseInt(filters.page);
      filters.page = (filters.page - 1) * filters.limit;
      query += ` OFFSET $${values.length + 1}`;
      values.push(`${filters.page}`);
    }
    totalpages = Math.ceil(resultscount / filters.limit);
  }
  const data = await pool.query(query, values);
  const datacount = data.rowCount;
  return {
    totaldata,
    totalkk,
    resultscount,
    results: result.rows,
    totalpages,
    currentpage,
    datacount,
    data: data.rows,
  };
};

const getUniqueValues = async () => {
  const columns = [
    "jenis_kelamin",
    "status_perkawinan",
    "golongan_darah",
    "agama",
    "pendidikan",
    "pekerjaan",
    "dusun",
    "jorong",
  ];
  let uniqueValues = {};

  for (const column of columns) {
    const query = `SELECT DISTINCT ${column} FROM penduduk;`; // Ganti 'kk' dengan nama tabel yang benar
    const result = await pool.query(query);
    uniqueValues[column] = result.rows.map((row) => row[column]);
  }

  return uniqueValues;
};

const getPendudukById = async (id) => {
  const query = `SELECT * FROM penduduk WHERE id = $1`;
  const result = await pool.query(query, [id]);
  return result.rows[0];
};
const getPendudukByKK = async (kk) => {
  const query = `SELECT *, CONCAT(
        EXTRACT(YEAR FROM AGE(NOW(), tanggal_lahir)), ' Tahun, ',
        EXTRACT(MONTH FROM AGE(NOW(), tanggal_lahir)), ' Bulan'
    ) AS umur FROM penduduk WHERE kk = $1`;
  const result = await pool.query(query, [kk]);
  const query2 = `SELECT * FROM kartukeluarga WHERE kk = $1`;
  const result2 = await pool.query(query2, [kk]);

  return {
    data: result.rows,
    data2: result2.rows,
  };
};
const getPendudukByNIK = async (nik) => {
  const query = `SELECT *, CONCAT(
        EXTRACT(YEAR FROM AGE(NOW(), tanggal_lahir)), ' Tahun, ',
        EXTRACT(MONTH FROM AGE(NOW(), tanggal_lahir)), ' Bulan'
    ) AS umur FROM penduduk WHERE nik = $1`;
  const result = await pool.query(query, [nik]);
  return result.rows;
};

const updateDataPenduduk = async (id, data) => {
  const query = `UPDATE penduduk SET  
                nik = $1,
                kk = $2, 
                nama = $3, 
                jenis_kelamin = $4, 
                tempat_lahir = $5,
                tanggal_lahir = $6, 
                nama_ibu = $7, 
                nama_ayah = $8, 
                status_perkawinan = $9, 
                golongan_darah = $10, 
                agama = $11, 
                pendidikan = $12, 
                pekerjaan = $13, 
                hubungan_keluarga = $14,
                alamat = $15, 
                dusun = $16, 
                jorong = $17
                WHERE id = $18`;
  const values = [
    data.nik,
    data.kk,
    data.nama,
    data.jenis_kelamin,
    data.tempat_lahir,
    data.tanggal_lahir,
    data.nama_ibu,
    data.nama_ayah,
    data.status_perkawinan,
    data.golongan_darah,
    data.agama,
    data.pendidikan,
    data.pekerjaan,
    data.hubungan_keluarga,
    data.alamat,
    data.dusun,
    data.jorong,
  ];
  await pool.query(query, [...values, id]);
};
const insertDataPenduduk = async (data) => {
  const query = `INSERT INTO penduduk (
    nik,
    kk,
    nama,
    jenis_kelamin,
    tempat_lahir,
    tanggal_lahir,
    nama_ibu,
    nama_ayah,
    status_perkawinan,
    golongan_darah,
    agama,
    pendidikan,
    pekerjaan,
    hubungan_keluarga,
    alamat,
    dusun,
    jorong
    
  ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)`;
  const values = [
    data.nik,
    data.kk,
    data.nama,
    data.jenis_kelamin,
    data.tempat_lahir,
    data.tanggal_lahir,
    data.nama_ibu,
    data.nama_ayah,
    data.status_perkawinan,
    data.golongan_darah,
    data.agama,
    data.pendidikan,
    data.pekerjaan,
    data.hubungan_keluarga,
    data.alamat,
    data.dusun,
    data.jorong,
  ];
  await pool.query(query, values);
};

const deletePenduduk = async (id) => {
  const query = `DELETE FROM penduduk WHERE id = $1`;
  await pool.query(query, [id]);
};

const getDataDasar = async () => {
  const query = `SELECT
    (SELECT COUNT(*) FROM penduduk) AS jumlah_penduduk,
    (SELECT COUNT(*) FROM penduduk WHERE jenis_kelamin = 'L') AS jumlah_laki_laki,
    (SELECT COUNT(*) FROM penduduk WHERE jenis_kelamin = 'P') AS jumlah_perempuan,
    (SELECT COUNT(DISTINCT kk) FROM penduduk) AS jumlah_kk`;
  const result = await pool.query(query);
  return result.rows;
};

const getDataUmur = async () => {
  const query = `WITH umur AS(
SELECT
  CASE
    WHEN EXTRACT(YEAR FROM AGE(CURRENT_DATE, tanggal_lahir)) BETWEEN 0 AND 4 THEN '0-4'
    WHEN EXTRACT(YEAR FROM AGE(CURRENT_DATE, tanggal_lahir)) BETWEEN 5 AND 9 THEN '5-9'
    WHEN EXTRACT(YEAR FROM AGE(CURRENT_DATE, tanggal_lahir)) BETWEEN 10 AND 14 THEN '10-14'
    WHEN EXTRACT(YEAR FROM AGE(CURRENT_DATE, tanggal_lahir)) BETWEEN 15 AND 59 THEN '15-59'
    WHEN EXTRACT(YEAR FROM AGE(CURRENT_DATE, tanggal_lahir)) >= 60 THEN '60+'
    ELSE 'Tidak valid'
  END AS kategori_umur,
  COUNT(*) AS jumlah,
  CASE
    WHEN EXTRACT(YEAR FROM AGE(CURRENT_DATE, tanggal_lahir)) BETWEEN 0 AND 4 THEN 1
    WHEN EXTRACT(YEAR FROM AGE(CURRENT_DATE, tanggal_lahir)) BETWEEN 5 AND 9 THEN 2
    WHEN EXTRACT(YEAR FROM AGE(CURRENT_DATE, tanggal_lahir)) BETWEEN 10 AND 14 THEN 3
    WHEN EXTRACT(YEAR FROM AGE(CURRENT_DATE, tanggal_lahir)) BETWEEN 15 AND 59 THEN 4
    WHEN EXTRACT(YEAR FROM AGE(CURRENT_DATE, tanggal_lahir)) >= 60 THEN 5
    ELSE 99
  END AS urutan
FROM penduduk
GROUP BY kategori_umur, urutan
ORDER BY urutan)
SELECT kategori_umur, jumlah FROM umur
`;
  const result = await pool.query(query);
  return result.rows;
};

const getDataPerkawinan = async () => {
  const query = `WITH status_ranking AS (
  SELECT 
    status_perkawinan,
    COUNT(*) AS jumlah,
    ROW_NUMBER() OVER (ORDER BY COUNT(*) DESC) AS urutan
  FROM penduduk
  WHERE status_perkawinan IS NOT NULL
  GROUP BY status_perkawinan
),
top9 AS (
  SELECT 
    status_perkawinan, 
    jumlah,
    urutan
  FROM status_ranking
  WHERE urutan <= 9
),
lainnya AS (
  SELECT 
    'Lainnya' AS status_perkawinan,
    SUM(jumlah) AS jumlah,
    10 AS urutan
  FROM status_ranking
  WHERE urutan > 9
)
SELECT 
  status_perkawinan, 
  jumlah
FROM (
  SELECT * FROM top9
  UNION ALL
  SELECT * FROM lainnya
) final
ORDER BY urutan;

`;
  const result = await pool.query(query);
  return result.rows;
};

const getDataGolonganDarah = async () => {
  const query = `WITH ranking AS (
  SELECT 
    golongan_darah,
    COUNT(*) AS jumlah,
    ROW_NUMBER() OVER (ORDER BY COUNT(*) DESC) AS urutan
  FROM penduduk
  WHERE golongan_darah IS NOT NULL
  GROUP BY golongan_darah
),
jumlah_unik AS (
  SELECT COUNT(*) AS total_gd FROM ranking
),
top9 AS (
  SELECT 
    golongan_darah, 
    jumlah,
    urutan AS urut_manual
  FROM ranking
  WHERE urutan <= 9
),
lainnya_raw AS (
  SELECT 
    'Lainnya' AS golongan_darah,
    SUM(jumlah) AS jumlah,
    10 AS urut_manual
  FROM ranking, jumlah_unik
  WHERE urutan > 9 AND total_gd > 9
),
lainnya AS (
  SELECT * FROM lainnya_raw WHERE jumlah IS NOT NULL AND jumlah > 0
)
SELECT 
  golongan_darah, 
  jumlah
FROM (
  SELECT * FROM top9
  UNION ALL
  SELECT * FROM lainnya
) AS final
ORDER BY urut_manual;


`;
  const result = await pool.query(query);
  return result.rows;
};
const getDataAgama = async () => {
  const query = `WITH ranking AS (
  SELECT 
    agama,
    COUNT(*) AS jumlah,
    RANK() OVER (ORDER BY COUNT(*) DESC) AS urutan
  FROM penduduk
  WHERE agama IS NOT NULL
  GROUP BY agama
),
jumlah_unik AS (
  SELECT COUNT(DISTINCT agama) AS total_agama FROM ranking
),
top9 AS (
  SELECT 
    agama, 
    jumlah,
    urutan AS urut_manual
  FROM ranking
  WHERE urutan <= 9
),
lainnya_raw AS (
  SELECT 
    'Lainnya' AS agama,
    SUM(jumlah) AS jumlah,
    999 AS urut_manual
  FROM ranking, jumlah_unik
  WHERE urutan > 9 AND total_agama > 9
),
lainnya AS (
  SELECT * FROM lainnya_raw WHERE jumlah IS NOT NULL AND jumlah > 0
)
SELECT 
  agama, 
  jumlah
FROM (
  SELECT * FROM top9
  UNION ALL
  SELECT * FROM lainnya
) AS final
ORDER BY urut_manual;
`;
  const result = await pool.query(query);
  return result.rows;
};

const getDataPendidikan = async () => {
  const query = `WITH ranking AS (
  SELECT 
    pendidikan,
    COUNT(*) AS jumlah,
    RANK() OVER (ORDER BY COUNT(*) DESC) AS urutan
  FROM penduduk
  WHERE pendidikan IS NOT NULL
  GROUP BY pendidikan
),
jumlah_unik AS (
  SELECT COUNT(DISTINCT pendidikan) AS total_pendidikan FROM ranking
),
top9 AS (
  SELECT 
    pendidikan, 
    jumlah,
    urutan AS urut_manual
  FROM ranking
  WHERE urutan <= 9
),
lainnya_raw AS (
  SELECT 
    'Lainnya' AS pendidikan,
    SUM(jumlah) AS jumlah,
    999 AS urut_manual
  FROM ranking, jumlah_unik
  WHERE urutan > 9 AND total_pendidikan > 9
),
lainnya AS (
  SELECT * FROM lainnya_raw WHERE jumlah IS NOT NULL AND jumlah > 0
)
SELECT 
  pendidikan, 
  jumlah
FROM (
  SELECT * FROM top9
  UNION ALL
  SELECT * FROM lainnya
) AS final
ORDER BY urut_manual;
`;
  const result = await pool.query(query);
  return result.rows;
};

const getDataPekerjaan = async () => {
  const query = `WITH ranking AS (
  SELECT 
    pekerjaan,
    COUNT(*) AS jumlah,
    RANK() OVER (ORDER BY COUNT(*) DESC) AS urutan
  FROM penduduk
  WHERE pekerjaan IS NOT NULL
  GROUP BY pekerjaan
),
jumlah_unik AS (
  SELECT COUNT(DISTINCT pekerjaan) AS total_pekerjaan FROM ranking
),
top9 AS (
  SELECT 
    pekerjaan, 
    jumlah,
    urutan AS urut_manual
  FROM ranking
  WHERE urutan <= 9
),
lainnya_raw AS (
  SELECT 
    'Lainnya' AS pekerjaan,
    SUM(jumlah) AS jumlah,
    999 AS urut_manual
  FROM ranking, jumlah_unik
  WHERE urutan > 9 AND total_pekerjaan > 9
),
lainnya AS (
  SELECT * FROM lainnya_raw WHERE jumlah IS NOT NULL AND jumlah > 0
)
SELECT 
  pekerjaan, 
  jumlah
FROM (
  SELECT * FROM top9
  UNION ALL
  SELECT * FROM lainnya
) AS final
ORDER BY urut_manual;
`;
  const result = await pool.query(query);
  return result.rows;
};

const getDataDusun = async () => {
  const query = `WITH ranking AS (
  SELECT 
    dusun,
    jenis_kelamin,
    COUNT(*) AS jumlah
  FROM penduduk
  WHERE dusun IS NOT NULL AND jenis_kelamin IS NOT NULL
  GROUP BY dusun, jenis_kelamin
),
jumlah_unik AS (
  SELECT COUNT(DISTINCT dusun) AS total_dusun FROM ranking
),
top9 AS (
  SELECT 
    dusun, 
    jenis_kelamin,
    jumlah
  FROM ranking
  WHERE dusun IN (
    SELECT dusun
    FROM ranking
    GROUP BY dusun
    ORDER BY SUM(jumlah) DESC
    LIMIT 9
  )
),
lainnya_raw AS (
  SELECT 
    'Lainnya' AS dusun,
    'L' AS jenis_kelamin,
    SUM(jumlah) AS jumlah
  FROM ranking, jumlah_unik
  WHERE dusun NOT IN (
    SELECT dusun
    FROM ranking
    GROUP BY dusun
    ORDER BY SUM(jumlah) DESC
    LIMIT 9
  )
  GROUP BY jenis_kelamin
),
lainnya AS (
  SELECT * FROM lainnya_raw WHERE jumlah IS NOT NULL AND jumlah > 0
)
SELECT 
  dusun, 
  COALESCE(SUM(CASE WHEN jenis_kelamin = 'L' THEN jumlah ELSE 0 END), 0) AS laki_laki,
  COALESCE(SUM(CASE WHEN jenis_kelamin = 'P' THEN jumlah ELSE 0 END), 0) AS perempuan
FROM (
  SELECT dusun, jenis_kelamin, jumlah FROM top9
  UNION ALL
  SELECT dusun, jenis_kelamin, jumlah FROM lainnya
) AS final
GROUP BY dusun
ORDER BY dusun;
`;
  const result = await pool.query(query);
  return result.rows;
};

const getDataJorong = async () => {
  const query = `WITH ranking AS (
  SELECT 
    jorong,
    jenis_kelamin,
    COUNT(*) AS jumlah
  FROM penduduk
  WHERE jorong IS NOT NULL AND jenis_kelamin IS NOT NULL
  GROUP BY jorong, jenis_kelamin
),
jumlah_unik AS (
  SELECT COUNT(DISTINCT jorong) AS total_jorong FROM ranking
),
top9 AS (
  SELECT 
    jorong, 
    jenis_kelamin,
    jumlah
  FROM ranking
  WHERE jorong IN (
    SELECT jorong
    FROM ranking
    GROUP BY jorong
    ORDER BY SUM(jumlah) DESC
    LIMIT 9
  )
),
lainnya_raw AS (
  SELECT 
    'Lainnya' AS jorong,
    'L' AS jenis_kelamin,
    SUM(jumlah) AS jumlah
  FROM ranking, jumlah_unik
  WHERE jorong NOT IN (
    SELECT jorong
    FROM ranking
    GROUP BY jorong
    ORDER BY SUM(jumlah) DESC
    LIMIT 9
  )
  GROUP BY jenis_kelamin
),
lainnya AS (
  SELECT * FROM lainnya_raw WHERE jumlah IS NOT NULL AND jumlah > 0
)
SELECT 
  jorong, 
  COALESCE(SUM(CASE WHEN jenis_kelamin = 'L' THEN jumlah ELSE 0 END), 0) AS laki_laki,
  COALESCE(SUM(CASE WHEN jenis_kelamin = 'P' THEN jumlah ELSE 0 END), 0) AS perempuan
FROM (
  SELECT jorong, jenis_kelamin, jumlah FROM top9
  UNION ALL
  SELECT jorong, jenis_kelamin, jumlah FROM lainnya
) AS final
GROUP BY jorong
ORDER BY jorong;
`;
  const result = await pool.query(query);
  return result.rows;
};

module.exports = {
  getDataPenduduk,
  getUniqueValues,
  getPendudukById,
  getPendudukByKK,
  getPendudukByNIK,
  updateDataPenduduk,
  insertDataPenduduk,
  deletePenduduk,
  getDataDasar,
  getDataUmur,
  getDataPerkawinan,
  getDataGolonganDarah,
  getDataAgama,
  getDataPendidikan,
  getDataPekerjaan,
  getDataDusun,
  getDataJorong,
};
