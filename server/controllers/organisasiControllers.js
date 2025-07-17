const organisasiModels = require("../models/organisasiModels");

const getOrganisasiMain = async (req, res) => {
  try {
    const walinagari = await organisasiModels.getWalinagari();
    const perangkatBamus = await organisasiModels.getPerangkatBamus();
    return res.status(200).json({
      status: "success",
      walinagari: walinagari,
      perangkatBamus: perangkatBamus,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const getSingleOrganisasi = async (req, res) => {
  try {
    const { id } = req.params;
    const organisasi = await organisasiModels.getSingleOrganisasi(id);
    return res.status(200).json({
      status: "success",
      organisasi: organisasi,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
module.exports = {
  getOrganisasiMain,
  getSingleOrganisasi,
};
