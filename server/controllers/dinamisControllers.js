const dinamisModels = require("../models/dinamisModels");

const insertKategori = async (req, res) => {
  try {
    const { tipe, data } = req.body;
    const result = await dinamisModels.insertKategori(tipe, data);

    return res.json({ success: true, data: result[0] });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const getKategori = async (req, res) => {
  try {
    const { tipe } = req.params;
    const result = await dinamisModels.getKategori(tipe);
    return res.json({ success: true, data: result });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
const deleteKategori = async (req, res) => {
  try {
    const { data } = req.body;
    const result = await dinamisModels.deleteKategori(data);
    return res.json({ success: true, data: result });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const getKategoriListNik = async (req, res) => {
  try {
    const { tipe } = req.params;
    const result = await dinamisModels.getKategoriListNik(tipe);
    return res.json({ success: true, data: result });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
const getKategoriListKK = async (req, res) => {
  try {
    const { tipe } = req.params;
    const result = await dinamisModels.getKategoriListKK(tipe);
    return res.json({ success: true, data: result });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
const insertDataDinamisNik = async (req, res) => {
  try {
    const { nik, data, keterangan } = req.body;
    const result = await dinamisModels.insertDataDinamisNik(nik, data, keterangan);
    return res.json({ success: true, data: result });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
const insertDataDinamisKK = async (req, res) => {
  try {
    const { kk, data, keterangan } = req.body;
    const result = await dinamisModels.insertDataDinamisKK(kk, data, keterangan);
    return res.json({ success: true, data: result });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
const deleteDataDinamisNik = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await dinamisModels.deleteDataDinamisNik(id);
    return res.json({ success: true, data: result });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
const deleteDataDinamisKK = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await dinamisModels.deleteDataDinamisKK(id);
    return res.json({ success: true, data: result });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
const getDataDinamisByNik = async (req, res) => {
  try {
    const { nik } = req.params;
    const result = await dinamisModels.getDataDinamisByNik(nik);
    return res.json({ success: true, data: result });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
const getDataDinamisByKK = async (req, res) => {
  try {
    const { kk } = req.params;
    const result = await dinamisModels.getDataDinamisByKK(kk);
    return res.json({ success: true, data: result });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
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
