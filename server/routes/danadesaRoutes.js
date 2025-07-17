const express = require("express");
const danadesaControllers = require("../controllers/danadesaControllers");
const routerDanadesa = express.Router();

routerDanadesa.get("/income/:tahun", danadesaControllers.getIncomeTahun);
routerDanadesa.get("/outcome/:tahun", danadesaControllers.getOutcomeTahun);
routerDanadesa.post("/insertincome", danadesaControllers.insertIncome);
routerDanadesa.post("/insertoutcome", danadesaControllers.insertOutcome);
routerDanadesa.get("/apbnagari/:tahun", danadesaControllers.getAPBNagari);
routerDanadesa.get("/apbtahunan", danadesaControllers.getAPBTahunan);
routerDanadesa.get("/apbbulanan/:tahun", danadesaControllers.getAPBBulanan);
routerDanadesa.delete("/deleteincome/:id", danadesaControllers.deleteIncomeById);
routerDanadesa.delete("/deleteoutcome/:id", danadesaControllers.deleteOutcomeById);
routerDanadesa.get("/singleincome/:id", danadesaControllers.getIncomeById);
routerDanadesa.get("/singleoutcome/:id", danadesaControllers.getOutcomeById);
routerDanadesa.put("/updateincome/:id", danadesaControllers.updateIncomeById);
routerDanadesa.put("/updateoutcome/:id", danadesaControllers.updateOutcomeById);
module.exports = routerDanadesa;
