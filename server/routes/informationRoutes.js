const express = require("express");
const pool = require("../config/db");

const slugify = require("slugify");
const informationControllers = require("../controllers/informationControllers");
const routerInformasi = express.Router();

// Fungsi untuk membersihkan nama file (menghapus karakter tidak valid)
const upload = require("../function/multerFunction");

routerInformasi.post("/informasi", upload.fields([{ name: "image" }, { name: "pdf" }]), async (req, res) => {
  try {
    const { title, paragraph1, paragraph2, paragraph3, paragraph4, imgcap, category, author, status } = req.body;
    const slug = slugify(title, { lower: true, strict: true });
    const imageUrl = req.files["image"] ? `/uploads/${req.files["image"][0].filename}` : null;
    const pdfUrl = req.files["pdf"] ? `/uploads/${req.files["pdf"][0].filename}` : null;

    const result = await pool.query(
      "INSERT INTO informasi (title, slug, paragraph1, paragraph2, paragraph3, paragraph4, image, imgcap, pdf, category, author, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *",
      [title, slug, paragraph1, paragraph2, paragraph3, paragraph4, imageUrl, imgcap, pdfUrl, category, author, status]
    );

    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
});
routerInformasi.put("/informasi/:id", upload.fields([{ name: "image" }, { name: "pdf" }]), async (req, res) => {
  try {
    const { id } = req.params;
    const { title, paragraph1, paragraph2, paragraph3, paragraph4, imgcap, category, author, status, time_stamp } =
      req.body;
    const image = req.files["image"] ? `/uploads/${req.files["image"][0].filename}` : req.body.image;
    const pdf = req.files["pdf"] ? `/uploads/${req.files["pdf"][0].filename}` : req.body.pdf;

    const result = await pool.query(
      "UPDATE informasi SET title = $1, paragraph1 = $2, paragraph2 = $3, paragraph3 = $4, paragraph4 = $5, category = $6, author = $7, status = $8, image = $9, imgcap = $10, pdf = $11, time_stamp = $12 WHERE id = $13 RETURNING *",
      [
        title,
        paragraph1,
        paragraph2,
        paragraph3,
        paragraph4,
        category,
        author,
        status,
        image,
        imgcap,
        pdf,
        time_stamp,
        id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Informasi tidak ditemukan" });
    }

    res.json({ message: "Informasi berhasil diperbarui", data: result.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Terjadi kesalahan server");
  }
});
routerInformasi.post("/insertgalerifotoberita", upload.fields([{ name: "foto" }]), async (req, res) => {
  try {
    const { id_informasi, tipe } = req.body;

    const item = req.files["foto"] ? `/uploads/${req.files["foto"][0].filename}` : null;

    const result = await pool.query(
      "INSERT INTO galerikegiatan (id_informasi,tipe,item) VALUES ($1, $2, $3) RETURNING *",
      [id_informasi, tipe, item]
    );

    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.log(error.message);

    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
});
routerInformasi.post("/insertgalerivideoberita", async (req, res) => {
  try {
    const { id_informasi, tipe } = req.body;

    const item = req.body.video || null;

    const result = await pool.query(
      "INSERT INTO galerikegiatan (id_informasi,tipe,item) VALUES ($1, $2, $3) RETURNING *",
      [id_informasi, tipe, item]
    );

    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.log(error.message);

    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
});
routerInformasi.get("/informasi/:limit", informationControllers.getInformasi);
routerInformasi.get("/informasiall/:limit", informationControllers.getInformasiAll);
routerInformasi.get("/informasi/:author/:limit", informationControllers.getInformasiByAuthor);
routerInformasi.delete("/informasi/:id", informationControllers.deleteSingleInformasi);
routerInformasi.get("/informasiId/:id", informationControllers.getInformasiById);
routerInformasi.get("/carousel", informationControllers.getCarousel);
routerInformasi.get("/informasi/info/:category/:slug", informationControllers.getSingleInformasi);
routerInformasi.get("/informasilain/:category", informationControllers.getInformasiLain);
routerInformasi.post("/views/:slug", informationControllers.postViews);
routerInformasi.get("/informasigrup/event", informationControllers.getEvent);
routerInformasi.get("/informasigrup/berita", informationControllers.getBerita);
routerInformasi.get("/informasigrup/pengumuman", informationControllers.getPengumuman);
routerInformasi.get("/datanagari", informationControllers.getDataNagari);
routerInformasi.put("/datanagari/:id", informationControllers.editDataNagari);
routerInformasi.get("/datagempa/gempa", informationControllers.getDataGempa);
routerInformasi.get("/datacuaca/cuaca", informationControllers.getDataCuaca);
routerInformasi.get("/galerifotoberita/:id_informasi", informationControllers.getGaleriFotoBerita);
routerInformasi.delete("/galerifotoberita/:id", informationControllers.deleteGaleriFotoBerita);
routerInformasi.get("/galerivideoberita/:id_informasi", informationControllers.getGaleriVideoBerita);
routerInformasi.delete("/galerivideoberita/:id", informationControllers.deleteGaleriVideoBerita);
routerInformasi.get("/galerifoto/:limit", informationControllers.getAllFoto);
routerInformasi.get("/galerivideo/:limit", informationControllers.getAllVideo);
module.exports = routerInformasi;
