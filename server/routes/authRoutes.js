const express = require("express");
const authControllers = require("../controllers/authControllers");
const routerAuth = express.Router();

routerAuth.post("/register", authControllers.register);
routerAuth.post("/login", authControllers.login);
routerAuth.delete("/logout", authControllers.logout);
routerAuth.get("/verify", authControllers.verifyToken);
routerAuth.get("/users", authControllers.getAllUsers);
routerAuth.delete("/users/:id", authControllers.deleteUserById);

module.exports = routerAuth;
