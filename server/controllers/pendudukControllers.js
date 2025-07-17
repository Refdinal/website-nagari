const pendudukModels = require("../models/pendudukModels");

const getDataPenduduk = async (req, res) => {
  try {
    const filters = req.query;
    const { totaldata, totalkk, resultscount, totalpages, currentpage, datacount, data } =
      await pendudukModels.getDataPenduduk(filters);
    if (data.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "Data tidak ditemukan",
      });
    }
    return res.status(200).json({
      status: "success",
      totaldata,
      totalkk,
      resultscount,
      totalpages,
      currentpage,
      datacount,
      data,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
const getUniqueValues = async (req, res) => {
  try {
    const uniqueValues = await pendudukModels.getUniqueValues();

    return res.status(200).json({
      status: "success",
      uniqueValues,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
const getPendudukById = async (req, res) => {
  try {
    const { id } = req.params;
    const penduduk = await pendudukModels.getPendudukById(id);
    if (!penduduk) {
      return res.status(404).json({
        status: "error",
        message: "Data tidak ditemukan",
      });
    }
    return res.status(200).json({
      status: "success",
      data: penduduk,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
const getPendudukByKK = async (req, res) => {
  try {
    const { kk } = req.params;
    const { data, data2 } = await pendudukModels.getPendudukByKK(kk);
    if (!data) {
      return res.status(404).json({
        status: "error",
        message: "Data tidak ditemukan",
      });
    }
    return res.status(200).json({
      status: "success",
      data: data,
      data2: data2,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
const getPendudukByNIK = async (req, res) => {
  try {
    const { nik } = req.params;
    const penduduk = await pendudukModels.getPendudukByNIK(nik);
    if (!penduduk) {
      return res.status(404).json({
        status: "error",
        message: "Data tidak ditemukan",
      });
    }
    return res.status(200).json({
      status: "success",
      data: penduduk,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
const updateDataPenduduk = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    await pendudukModels.updateDataPenduduk(id, data);

    return res.status(200).json({
      status: "success",
      message: "Data berhasil diperbarui",
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
const insertDataPenduduk = async (req, res) => {
  try {
    const data = req.body;
    await pendudukModels.insertDataPenduduk(data);
    return res.status(200).json({
      status: "success",
      message: "Data berhasil ditambahkan",
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const deletePenduduk = async (req, res) => {
  try {
    const { id } = req.params;
    await pendudukModels.deletePenduduk(id);
    return res.status(200).json({
      status: "success",
      message: "Data berhasil dihapus",
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const getDataDasar = async (req, res) => {
  try {
    const statistik = await pendudukModels.getDataDasar();
    return res.status(200).json({
      status: "success",
      statistik,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const getStatistik = async (req, res) => {
  try {
    const statistik = await pendudukModels.getDataDasar();
    const umur = await pendudukModels.getDataUmur();
    const perkawinan = await pendudukModels.getDataPerkawinan();
    const golongan_darah = await pendudukModels.getDataGolonganDarah();
    const agama = await pendudukModels.getDataAgama();
    const pendidikan = await pendudukModels.getDataPendidikan();
    const pekerjaan = await pendudukModels.getDataPekerjaan();
    const dusun = await pendudukModels.getDataDusun();
    const jorong = await pendudukModels.getDataJorong();
    return res.status(200).json({
      status: "success",
      statistik,
      umur,
      perkawinan,
      golongan_darah,
      agama,
      pendidikan,
      pekerjaan,
      dusun,
      jorong,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
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
  getStatistik,
};
