const express = require("express");
const pendudukControllers = require("../controllers/pendudukControllers");
const apiKeyMiddleware = require("../middleware/apiKeyMiddleware");
const routerPenduduk = express.Router();
const pool = require("../config/db");
const upload = require("../function/multerFunction");

routerPenduduk.put("/datakkupdate", upload.fields([{ name: "foto" }]), async (req, res) => {
  try {
    const { kk, latitude, longitude } = req.body;
    const foto = req.files["foto"] ? `/uploads/${req.files["foto"][0].filename}` : req.body.foto;

    const result = await pool.query(
      "UPDATE kartukeluarga SET kk = $1, foto = $2, latitude = $3,  longitude = $4 WHERE kk = $1 RETURNING *",
      [kk, foto, latitude, longitude]
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
routerPenduduk.post("/datakkbaru", upload.fields([{ name: "foto" }]), async (req, res) => {
  try {
    const { kk, latitude, longitude } = req.body;
    const foto = req.files["foto"] ? `/uploads/${req.files["foto"][0].filename}` : req.body.foto;

    const result = await pool.query(
      `INSERT INTO kartukeluarga (kk,foto,latitude,longitude)
      VALUES ($1,$2,$3,$4) RETURNING *`,
      [kk, foto, latitude, longitude]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Informasi tidak ditemukan" });
    }

    res.json({ message: "Informasi berhasil diperbarui", data: result.rows[0] });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Terjadi kesalahan server");
  }
});
routerPenduduk.get("/data", apiKeyMiddleware, pendudukControllers.getDataPenduduk);
routerPenduduk.get("/unique", pendudukControllers.getUniqueValues);
routerPenduduk.get("/:id", pendudukControllers.getPendudukById);
routerPenduduk.get("/kk/:kk", pendudukControllers.getPendudukByKK);
routerPenduduk.get("/nik/:nik", pendudukControllers.getPendudukByNIK);
routerPenduduk.put("/update/:id", pendudukControllers.updateDataPenduduk);
routerPenduduk.post("/insert", pendudukControllers.insertDataPenduduk);
routerPenduduk.delete("/delete/:id", pendudukControllers.deletePenduduk);
routerPenduduk.get("/statistik/datadasar", pendudukControllers.getDataDasar);
routerPenduduk.get("/statistik/statistikdetail", pendudukControllers.getStatistik);
module.exports = routerPenduduk;
