const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const sanitizeFilename = (name) => {
  return name
    .replace(/\s+/g, "-") // Ganti spasi dengan "-"
    .replace(/[^a-zA-Z0-9.-]/g, ""); // Hapus karakter tidak valid
};

// Konfigurasi penyimpanan Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${uuidv4()}`;
    const sanitizedOriginalName = sanitizeFilename(path.parse(file.originalname).name);
    const fileExtension = path.extname(file.originalname);

    cb(null, `${uniqueSuffix}-${sanitizedOriginalName}${fileExtension}`);
  },
});
const upload = multer({ storage: storage });
module.exports = upload;
