"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signOut = void 0;
const signOut_service_1 = require("../services/signOut.service");
const signOut = async (req, res) => {
    try {
        await (0, signOut_service_1.authSignOut)();
        res.status(200).json({ message: "Signed out successfully" });
    }
    catch (err) {
        res.status(500).json({ error: err.message || "Failed to sign out" });
    }
};
exports.signOut = signOut;
