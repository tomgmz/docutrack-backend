"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authGoogle_controller_1 = require("../controllers/authGoogle.controller");
const router = (0, express_1.Router)();
router.get("/google", authGoogle_controller_1.redirectToGoogle);
router.get("/callback", authGoogle_controller_1.googleCallback);
exports.default = router;
