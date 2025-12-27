"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const authLogin_service_1 = require("../services/authLogin.service");
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const data = await (0, authLogin_service_1.authlogin)(email, password);
        res.status(200).send(data);
    }
    catch (error) {
        res.status(400).send("Failed to login.");
    }
};
exports.login = login;
