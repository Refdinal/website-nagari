const pool = require("../config/db");

const getInformasi = async (limit) => {
  const result = await pool.query(
    "SELECT * FROM informasi WHERE status ='Published' ORDER BY time_stamp DESC LIMIT $1",
    [limit]
  );
  return result.rows;
};
const getInformasiAll = async (limit) => {
  const result = await pool.query("SELECT * FROM informasi ORDER BY time_stamp DESC LIMIT $1", [limit]);
  return result.rows;
};
const getInformasiByAuthor = async (auhtor, limit) => {
  const result = await pool.query("SELECT * FROM informasi WHERE author = $1 ORDER BY time_stamp DESC LIMIT $2", [
    auhtor,
    limit,
  ]);
  return result.rows;
};
const getInformasiById = async (id) => {
  const result = await pool.query("SELECT * FROM informasi WHERE id = $1 ", [id]);
  return result.rows;
};

const deleteSingleInformasi = async (id) => {
  await pool.query("DELETE FROM informasi WHERE id = $1", [id]);
};

const getCarousel = async () => {
  const result = await pool.query(
    "SELECT id,title,image FROM informasi WHERE category = 'Event' AND status = 'Published' ORDER BY time_stamp DESC LIMIT 3"
  );
  return result.rows;
};
const getSingleInformasi = async (category, slug) => {
  const result = await pool.query(
    "SELECT * FROM informasi WHERE category = $1 AND slug = $2",
    [category, slug] // ✅ Pastikan kedua parameter digunakan
  );
  return result.rows;
};

const getInformasiLain = async (category) => {
  const result = await pool.query(
    `SELECT id,title,slug,category,views FROM informasi WHERE category = $1 AND status = 'Published' ORDER BY time_stamp DESC`,
    [category]
  );

  return result.rows;
};

const postViews = async (slug) => {
  const result = await pool.query("UPDATE informasi SET views = views + 1 WHERE slug = $1", [slug]);
  return result.rows;
};

const getEvent = async () => {
  const result = await pool.query(
    "SELECT * FROM informasi WHERE category = 'Event' AND status = 'Published' ORDER BY time_stamp DESC "
  );
  return result.rows;
};
const getBerita = async () => {
  const result = await pool.query(
    "SELECT * FROM informasi WHERE category = 'Berita' AND status = 'Published' ORDER BY time_stamp DESC "
  );
  return result.rows;
};
const getPengumuman = async () => {
  const result = await pool.query(
    "SELECT * FROM informasi WHERE category = 'Pengumuman' AND status = 'Published' ORDER BY time_stamp DESC "
  );
  return result.rows;
};
const getDataNagari = async () => {
  const result = await pool.query("SELECT * FROM datanagari");
  return result.rows;
};
const updateDataNagari = async (id, sambutan, yt_embed, email, telepon, facebook, instagram, youtube) => {
  return await pool.query(
    "UPDATE datanagari SET sambutan = $1, yt_embed = $2, email = $3, telepon = $4, facebook = $5, instagram = $6, youtube = $7 WHERE id = $8 RETURNING *",
    [sambutan, yt_embed, email, telepon, facebook, instagram, youtube, id]
  );
};

const getGaleriFotoBerita = async (id_informasi) => {
  const result = await pool.query(`SELECT * FROM galerikegiatan WHERE id_informasi = $1 AND tipe = 'foto'`, [
    id_informasi,
  ]);

  return result.rows;
};

const deleteGaleriFotoBerita = async (id) => {
  await pool.query("DELETE FROM galerikegiatan WHERE id = $1", [id]);
};

const getGaleriVideoBerita = async (id_informasi) => {
  const result = await pool.query(`SELECT * FROM galerikegiatan WHERE id_informasi = $1 AND tipe = 'video'`, [
    id_informasi,
  ]);
  return result.rows;
};
const deleteGaleriVideoBerita = async (id) => {
  await pool.query("DELETE FROM galerikegiatan WHERE id = $1", [id]);
};

const getAllFoto = async (limit) => {
  const result = await pool.query(
    `
    SELECT 
      gk.id,
      gk.id_informasi,
      gk.item,
      i.category,
      i.slug,
      i.time_stamp
    FROM galerikegiatan AS gk
    LEFT JOIN informasi AS i
        ON gk.id_informasi::uuid = i.id
    WHERE gk.tipe = 'foto'
    ORDER BY time_stamp DESC
    LIMIT $1
   
    `,
    [limit]
  );
  return result.rows;
};
const getAllVideo = async (limit) => {
  const result = await pool.query(
    `
    SELECT 
      gk.id,
      gk.id_informasi,
      gk.item,
      i.category,
      i.slug,
      i.time_stamp
    FROM galerikegiatan AS gk
    LEFT JOIN informasi AS i
        ON gk.id_informasi::uuid = i.id
    WHERE gk.tipe = 'video'
    ORDER BY time_stamp DESC
    LIMIT $1
    `,
    [limit]
  );
  return result.rows;
};
module.exports = {
  getInformasi,
  getInformasiAll,
  getInformasiByAuthor,
  getInformasiById,
  deleteSingleInformasi,
  getCarousel,
  getSingleInformasi,
  getInformasiLain,
  postViews,
  getEvent,
  getBerita,
  getPengumuman,
  getDataNagari,
  updateDataNagari,
  getGaleriFotoBerita,
  deleteGaleriFotoBerita,
  getGaleriVideoBerita,
  deleteGaleriVideoBerita,
  getAllFoto,
  getAllVideo,
};
