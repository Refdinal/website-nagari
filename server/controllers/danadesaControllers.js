const pendapatanModels = require("../models/danadesaModels");

const getIncomeTahun = async (req, res) => {
  try {
    const tahun = req.params.tahun;
    const income = await pendapatanModels.getIncomeTahun(tahun);
    return res.status(200).json({
      status: "success",
      pendapatan: income,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
const getOutcomeTahun = async (req, res) => {
  try {
    const tahun = req.params.tahun;
    const outcome = await pendapatanModels.getOutcomeTahun(tahun);
    return res.status(200).json({
      status: "success",
      belanja: outcome,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
const insertIncome = async (req, res) => {
  try {
    const { jenis_income, sumber_dana, tahun_anggaran, jumlah, realisasi } = req.body;
    const result = await pendapatanModels.insertIncome(jenis_income, sumber_dana, tahun_anggaran, jumlah, realisasi);

    return res.json({ success: true, data: result[0] });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
const insertOutcome = async (req, res) => {
  try {
    const { jenis_outcome, sumber_dana, tahun_anggaran, bidang, bulan, realisasi } = req.body;
    const result = await pendapatanModels.insertOutcome(
      jenis_outcome,
      sumber_dana,
      tahun_anggaran,
      bidang,
      bulan,
      realisasi
    );

    return res.json({ success: true, data: result[0] });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

// client
const getAPBNagari = async (req, res) => {
  try {
    const tahun = req.params.tahun;
    const { pendapatan, pembiayaan, belanja, pengeluaran, surplus_defisit } = await pendapatanModels.getAPBNagari(
      tahun
    );

    return res.status(200).json({
      status: "success",
      pendapatan: pendapatan,
      pembiayaan: pembiayaan,
      belanja: belanja,
      pengeluaran: pengeluaran,
      surplus_defisit: surplus_defisit,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
const getAPBTahunan = async (req, res) => {
  try {
    const tahunSekarang = new Date().getFullYear();
    const tahunArray = [];

    for (let i = 0; i < 5; i++) {
      tahunArray.push(tahunSekarang - i);
    }

    const hasil = [];

    for (const tahun of tahunArray) {
      const { pendapatan, pembiayaan, belanja, pengeluaran, surplus_defisit } = await pendapatanModels.getAPBNagari(
        tahun
      );

      hasil.push({
        tahun,
        pendapatan,
        pembiayaan,
        belanja,
        pengeluaran,
        surplus_defisit,
      });
    }

    return res.status(200).json({
      status: "success",
      data: hasil,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const getAPBBulanan = async (req, res) => {
  try {
    const tahun = req.params.tahun;
    const rows = await pendapatanModels.getAPBBulanan(tahun);

    // Buat format Chart.js
    const labels = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];
    const grouped = {};

    rows.forEach((row) => {
      if (!grouped[row.bidang]) {
        grouped[row.bidang] = Array(12).fill(0);
      }
      grouped[row.bidang][row.bulan - 1] = parseFloat(row.total_realisasi);
    });

    const datasets = Object.entries(grouped).map(([bidang, data]) => ({
      label: bidang,
      data,
    }));

    return res.status(200).json({
      status: "success",
      data: {
        labels,
        datasets,
      },
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
const getIncomeById = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await pendapatanModels.getIncomeById(id);
    return res.status(200).json({
      status: "success",
      data: result[0],
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
const getOutcomeById = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await pendapatanModels.getOutcomeById(id);
    return res.status(200).json({
      status: "success",
      data: result[0],
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
const updateIncomeById = async (req, res) => {
  try {
    const id = req.params.id;
    const { jenis_income, sumber_dana, tahun_anggaran, jumlah, realisasi } = req.body;
    const result = await pendapatanModels.updateIncomeById(
      id,
      jenis_income,
      sumber_dana,
      tahun_anggaran,
      jumlah,
      realisasi
    );
    return res.status(200).json({
      status: "success",
      data: result[0],
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
const updateOutcomeById = async (req, res) => {
  try {
    const id = req.params.id;
    const { jenis_outcome, sumber_dana, tahun_anggaran, bidang, bulan, realisasi } = req.body;
    const result = await pendapatanModels.updateOutcomeById(
      id,
      jenis_outcome,
      sumber_dana,
      tahun_anggaran,
      bidang,
      bulan,
      realisasi
    );
    return res.status(200).json({
      status: "success",
      data: result[0],
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
const deleteIncomeById = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await pendapatanModels.deleteIncomeById(id);
    return res.status(200).json({
      status: "success",
      data: result[0],
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
const deleteOutcomeById = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await pendapatanModels.deleteOutcomeById(id);
    return res.status(200).json({
      status: "success",
      data: result[0],
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = {
  getIncomeTahun,
  getOutcomeTahun,
  insertIncome,
  insertOutcome,
  getAPBNagari,
  getAPBTahunan,
  getAPBBulanan,
  deleteIncomeById,
  deleteOutcomeById,
  getIncomeById,
  getOutcomeById,
  updateIncomeById,
  updateOutcomeById,
};
