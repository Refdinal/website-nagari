const express = require("express");
const organisasiControllers = require("../controllers/organisasiControllers");
const routerOrganisasi = express.Router();
const upload = require("../function/multerFunction");

const pool = require("../config/db");
routerOrganisasi.put("/single/:id", upload.fields([{ name: "foto" }]), async (req, res) => {
  try {
    const { id } = req.params;
    const { organisasi, jabatan, nama } = req.body;
    const foto = req.files["foto"] ? `/uploads/${req.files["foto"][0].filename}` : req.body.foto;

    const result = await pool.query(
      "UPDATE organisasi SET organisasi = $1, jabatan = $2, nama = $3,  foto = $4 WHERE id = $5 RETURNING *",
      [organisasi, jabatan, nama, foto, id]
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
routerOrganisasi.get("/main", organisasiControllers.getOrganisasiMain);
routerOrganisasi.get("/single/:id", organisasiControllers.getSingleOrganisasi);
module.exports = routerOrganisasi;
