const express = require("express");

const validation = require("../validation/validation");

const router = express.Router();

const authController = require("../controllers/auth");

router.post("/register", validation.validRegister, authController.postSignup);

router.post("/login", validation.validLogin, authController.postLogin);

router.post("/logout", authController.postLogout);

module.exports = router;
