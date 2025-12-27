"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUp = void 0;
const auth_service_1 = require("../services/auth.service");
const profile_service_1 = require("../services/profile.service");
const signUp = async (req, res) => {
    const { email, password, username, first_name, last_name, middle_name } = req.body;
    try {
        // create user in Supabase Auth
        const authId = await (0, auth_service_1.createAuthUser)(email, password);
        if (!authId) {
            return res.status(400).json({ message: "Failed to create auth user" });
        }
        // insert profile in profiles table
        const profileInput = {
            auth_id: authId,
            first_name,
            last_name,
            middle_name,
            role: "user",
        };
        const profile = await (0, profile_service_1.createProfile)(profileInput);
        res.status(201).json({ message: "User successfully signed up", profile });
    }
    catch (err) {
        console.error("Sign-up error: ", err.message);
        res.status(400).json({ message: "Failed to sign up user", error: err.message });
    }
};
exports.signUp = signUp;
