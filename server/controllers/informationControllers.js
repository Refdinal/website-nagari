const informationModels = require("../models/informationModels");
const axios = require("axios");
const getInformasi = async (req, res) => {
  try {
    const { limit } = req.params;
    const informasi = await informationModels.getInformasi(limit);
    return res.status(200).json({
      status: "success",
      informasi: informasi,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
const getInformasiAll = async (req, res) => {
  try {
    const { limit } = req.params;
    const informasi = await informationModels.getInformasiAll(limit);
    return res.status(200).json({
      status: "success",
      informasi: informasi,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
const getInformasiByAuthor = async (req, res) => {
  try {
    const { author, limit } = req.params;
    const informasi = await informationModels.getInformasiByAuthor(author, limit);
    return res.status(200).json({
      status: "success",
      informasi: informasi,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
const getInformasiById = async (req, res) => {
  try {
    const { id } = req.params;
    const informasi = await informationModels.getInformasiById(id);
    return res.status(200).json({
      status: "success",
      informasi: informasi,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const deleteSingleInformasi = async (req, res) => {
  try {
    const { id } = req.params;

    await informationModels.deleteSingleInformasi(id);
    return res.status(200).json({
      status: "success",
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const getCarousel = async (req, res) => {
  try {
    const carousel = await informationModels.getCarousel();
    return res.status(200).json({
      status: "success",
      carousel: carousel,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
const getSingleInformasi = async (req, res) => {
  try {
    const { category, slug } = req.params; // ✅ Pastikan mengambil kedua parameter dari URL
    const informasi = await informationModels.getSingleInformasi(category, slug); // ✅ Memasukkan kedua parameter

    if (informasi.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "Informasi tidak ditemukan",
      });
    }

    return res.status(200).json({
      status: "success",
      informasi: informasi,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
const getInformasiLain = async (req, res) => {
  try {
    const { category } = req.params;

    if (!category) {
      return res.status(400).json({
        // 🔴 Jika category undefined, kirim error 400
        status: "error",
        message: "Category tidak boleh kosong",
      });
    }

    const informasi = await informationModels.getInformasiLain(category);

    if (informasi.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "Informasi tidak ditemukan",
      });
    }

    return res.status(200).json({
      status: "success",
      informasi: informasi,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const postViews = async (req, res) => {
  try {
    const { slug } = req.params;
    if (!req.cookies[slug]) {
      res.cookie(`${slug}`, true, {
        httpOnly: true,
        maxAge: 1000 * 60 * 5,
      });

      const informasi = await informationModels.postViews(slug);
      return res.status(200).json({
        status: "success",
        informasi: informasi,
      });
    }
    return res.status(200).json({ message: "User already viewed" });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const getEvent = async (req, res) => {
  try {
    const event = await informationModels.getEvent();
    return res.status(200).json({
      status: "success",
      event: event,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
const getBerita = async (req, res) => {
  try {
    const berita = await informationModels.getBerita();
    return res.status(200).json({
      status: "success",
      berita: berita,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
const getPengumuman = async (req, res) => {
  try {
    const pengumuman = await informationModels.getPengumuman();
    return res.status(200).json({
      status: "success",
      pengumuman: pengumuman,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const getDataNagari = async (req, res) => {
  try {
    const dataNagari = await informationModels.getDataNagari();
    return res.status(200).json({
      status: "success",
      dataNagari: dataNagari,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
const editDataNagari = async (req, res) => {
  try {
    const { id } = req.params; // Pastikan `id` ada di URL
    const { sambutan, yt_embed, email, telepon, facebook, instagram, youtube } = req.body;

    // Cek apakah ID valid
    if (!id) {
      return res.status(400).json({ message: "ID tidak boleh kosong" });
    }

    // Jalankan query update
    const result = await informationModels.updateDataNagari(
      id,
      sambutan,
      yt_embed,
      email,
      telepon,
      facebook,
      instagram,
      youtube
    );

    // Cek apakah ada data yang diperbarui
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Data Nagari tidak ditemukan" });
    }

    res.json({ message: "Data Nagari berhasil diperbarui", data: result.rows[0] });
  } catch (error) {
    console.error("Error saat memperbarui data:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server" });
  }
};

// Buat tempat simpan cache
let gempaCache = null;
let gempaCacheTime = 0;

let cuacaCache = null;
let cuacaCacheTime = 0;

// Durasi cache aktif dalam ms
const CACHE_DURATION = 5 * 60 * 1000;

const getDataGempa = async (req, res) => {
  const now = Date.now();

  try {
    // Cek cache
    if (gempaCache && now - gempaCacheTime < CACHE_DURATION) {
      console.log(`[${new Date().toISOString()}] (Gempa) Data dari cache`);
      return res.status(200).json(gempaCache);
    }

    // Ambil data baru
    console.log(`[${new Date().toISOString()}] (Gempa) Mengambil data baru dari BMKG...`);
    const response = await axios.get("https://data.bmkg.go.id/DataMKG/TEWS/gempadirasakan.json");

    gempaCache = response.data;
    gempaCacheTime = now;

    console.log(`[${new Date().toISOString()}] (Gempa) Data berhasil diambil dan disimpan ke cache`);
    return res.status(200).json(gempaCache);
  } catch (error) {
    console.error(`[${new Date().toISOString()}] (Gempa) Gagal mengambil data: ${error.message}`);
    return res.status(500).json({ error: "Gagal mengambil data dari BMKG" });
  }
};

const getDataCuaca = async (req, res) => {
  const now = Date.now();

  try {
    if (cuacaCache && now - cuacaCacheTime < CACHE_DURATION) {
      console.log(`[${new Date().toISOString()}] (Cuaca) Data dari cache`);
      return res.status(200).json(cuacaCache);
    }

    console.log(`[${new Date().toISOString()}] (Cuaca) Mengambil data baru dari BMKG...`);
    const response = await axios.get("https://api.bmkg.go.id/publik/prakiraan-cuaca?adm4=13.06.15.2003");

    const data1 = response.data.data[0].cuaca[0];
    const data2 = response.data.data[0].cuaca[1];
    const data3 = response.data.data[0].cuaca[2];
    const data = data1.concat(data2, data3);

    cuacaCache = data;
    cuacaCacheTime = now;

    console.log(`[${new Date().toISOString()}] (Cuaca) Data berhasil diambil dan disimpan ke cache`);
    return res.status(200).json(cuacaCache);
  } catch (error) {
    console.error(`[${new Date().toISOString()}] (Cuaca) Gagal mengambil data: ${error.message}`);
    return res.status(500).json({ error: "Gagal mengambil data dari BMKG" });
  }
};

const getGaleriFotoBerita = async (req, res) => {
  try {
    const { id_informasi } = req.params;
    const foto = await informationModels.getGaleriFotoBerita(id_informasi);
    return res.status(200).json({
      status: "success",
      foto: foto,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const deleteGaleriFotoBerita = async (req, res) => {
  try {
    const { id } = req.params;
    const foto = await informationModels.deleteGaleriFotoBerita(id);
    return res.status(200).json({
      status: "success",
      foto: foto,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const getGaleriVideoBerita = async (req, res) => {
  try {
    const { id_informasi } = req.params;
    const video = await informationModels.getGaleriVideoBerita(id_informasi);
    return res.status(200).json({
      status: "success",
      video: video,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
const deleteGaleriVideoBerita = async (req, res) => {
  try {
    const { id } = req.params;
    const video = await informationModels.deleteGaleriVideoBerita(id);

    return res.status(200).json({
      status: "success",
      video: video,
    });
  } catch (error) {
    console.log(error.message);

    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
const getAllFoto = async (req, res) => {
  try {
    const { limit } = req.params || 12;

    const foto = await informationModels.getAllFoto(limit);
    return res.status(200).json({
      status: "success",
      foto: foto,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
const getAllVideo = async (req, res) => {
  try {
    const { limit } = req.params || 4;
    const video = await informationModels.getAllVideo(limit);
    return res.status(200).json({
      status: "success",
      video: video,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
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
  editDataNagari,
  getDataGempa,
  getDataCuaca,
  getGaleriFotoBerita,
  deleteGaleriFotoBerita,
  getGaleriVideoBerita,
  deleteGaleriVideoBerita,
  getAllFoto,
  getAllVideo,
};
