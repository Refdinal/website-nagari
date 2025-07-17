const indexDesaModels = require("../models/indexDesaModels");

const getIndexTahun = async (req, res) => {
  try {
    const { tahun } = req.params;
    const { skor_desa, max_skor_desa, index_desa } = await indexDesaModels.getIndexTahun(tahun);

    return res.status(200).json({
      status: "success",
      data: [skor_desa[0], max_skor_desa[0], index_desa[0]],
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const getDataTahun = async (req, res) => {
  try {
    const { tahun } = req.params;
    const data = await indexDesaModels.getDataTahun(tahun);
    return res.status(200).json({
      status: "success",
      data: data.rows,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
const insertDataTahun = async (req, res) => {
  try {
    const { tahun } = req.params;

    // Mengecek apakah tahun sudah ada
    const check = await indexDesaModels.checkYear(tahun);

    if (check.length > 0) {
      // Tahun sudah ada, tidak melakukan insert
      return res.status(400).json({
        status: "error",
        message: `Data untuk tahun ${tahun} sudah ada.`,
      });
    }

    // Jika belum ada, insert data
    const data = await indexDesaModels.insertDataTahun(tahun);

    return res.status(200).json({
      status: "success",
      data: data.rows,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
const deleteDataTahun = async (req, res) => {
  try {
    const { tahun } = req.params;
    const data = await indexDesaModels.deleteDataTahun(tahun);
    return res.status(200).json({
      status: "success",
      data: data.rows,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
const editById = async (req, res) => {
  try {
    const { id } = req.params;
    const { skor } = req.body;
    const data = await indexDesaModels.editById(skor, id);
    return res.status(200).json({
      status: "success",
      data: data,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
module.exports = {
  getIndexTahun,
  getDataTahun,
  insertDataTahun,
  deleteDataTahun,
  editById,
};
