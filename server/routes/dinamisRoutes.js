const express = require("express");
const dinamisControllers = require("../controllers/dinamisControllers");

routerDinamis = express.Router();

routerDinamis.post("/insertKategori", dinamisControllers.insertKategori);
routerDinamis.get("/kategori/:tipe", dinamisControllers.getKategori);
routerDinamis.delete("/deletekategori", dinamisControllers.deleteKategori);
routerDinamis.get("/kategorilistnik/:tipe", dinamisControllers.getKategoriListNik);
routerDinamis.get("/kategorilistkk/:tipe", dinamisControllers.getKategoriListKK);
routerDinamis.post("/insertdatadinamisnik", dinamisControllers.insertDataDinamisNik);
routerDinamis.post("/insertdatadinamiskk", dinamisControllers.insertDataDinamisKK);
routerDinamis.delete("/deletedatadinamisnik/:id", dinamisControllers.deleteDataDinamisNik);
routerDinamis.delete("/deletedatadinamiskk/:id", dinamisControllers.deleteDataDinamisKK);
routerDinamis.get("/getdatadinamisbynik/:nik", dinamisControllers.getDataDinamisByNik);
routerDinamis.get("/getdatadinamisbykk/:kk", dinamisControllers.getDataDinamisByKK);
module.exports = routerDinamis;
