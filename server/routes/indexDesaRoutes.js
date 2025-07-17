const express = require("express");
const indexDesaControllers = require("../controllers/indexDesaControllers");
const routerIndexDesa = express.Router();

routerIndexDesa.get("/indexdesa/:tahun", indexDesaControllers.getIndexTahun);
routerIndexDesa.get("/indexdata/:tahun", indexDesaControllers.getDataTahun);
routerIndexDesa.post("/indexdata/:tahun", indexDesaControllers.insertDataTahun);
routerIndexDesa.delete("/indexdata/:tahun", indexDesaControllers.deleteDataTahun);
routerIndexDesa.patch("/indexdata/:id", indexDesaControllers.editById);
module.exports = routerIndexDesa;
