const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
// const rateLimit = require("express-rate-limit");
require("dotenv").config();

const cookieParser = require("cookie-parser");
// router
const routerInformasi = require("./routes/informationRoutes");
const routerAuth = require("./routes/authRoutes");
const routerTracker = require("./routes/trackerRoutes");
const routerPenduduk = require("./routes/pendudukRoutes");
const routerOrganisasi = require("./routes/organisasiRoutes");
const routerDanadesa = require("./routes/danadesaRoutes");
const routerIndexDesa = require("./routes/indexDesaRoutes");
const routerDinamis = require("./routes/dinamisRoutes");
app.use("/uploads", express.static("uploads"));
const allowedOrigins = process.env.CORS_ORIGIN.split(",");
app.use(express.json());
app.use(helmet());

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },

    credentials: true,
  })
);
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 menit
//   max: 100, // Maksimal 100 request per IP
// });

app.use(cookieParser());
// api

app.use("/api", routerInformasi);
app.use("/auth", routerAuth);
app.use("/api/tracker", routerTracker);
app.use("/penduduk", routerPenduduk);
app.use("/organisasi", routerOrganisasi);
app.use("/danadesa", routerDanadesa);
app.use("/index", routerIndexDesa);
app.use("/dinamis", routerDinamis);
app.get("/ping", (req, res) => {
  res.json({ message: "Server is running!" });
});
// listen port
const port = process.env.PORT || 8080; // Gunakan 8080 jika cPanel mendukung
app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});
