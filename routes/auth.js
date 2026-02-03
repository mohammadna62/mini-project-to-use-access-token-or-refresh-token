const express = require("express");
const authController = require("./../controllers/auth");

const router = express.Router();

router.post("/signin", authController.login);
router.post("/signup", authController.register);
router.post("/refresh-token", authController.refreshToken);

module.exports = router;
