"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleCallback = exports.redirectToGoogle = void 0;
const authGoogle_service_1 = require("../services/authGoogle.service");
const redirectToGoogle = (req, res) => {
    const next = req.query.next || "/";
    const { raw: nonce, hashed: hashedNonce } = (0, authGoogle_service_1.generateGoogleNonce)();
    res.cookie("supabase_nonce", nonce, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 5 * 60 * 1000,
    });
    const url = `https://rwxxmhqtwcgumihhimxg.supabase.co/auth/v1/authorize?provider=google&redirect_to=${process.env.FRONTEND_BASE_URL}/auth/callback&nonce=${hashedNonce}`;
    res.redirect(url);
};
exports.redirectToGoogle = redirectToGoogle;
const googleCallback = async (req, res) => {
    const code = req.query.code;
    const next = req.query.next || "/";
    const nonce = req.cookies.supabase_nonce;
    if (!code)
        return res.status(400).send("Missing OAuth code");
    if (!nonce)
        return res.status(400).send("Missing nonce cookie");
    try {
        // Only pass the code; nonce handling is via cookies / OAuth redirect
        const session = await (0, authGoogle_service_1.exchangeGoogleCode)(code);
        res.cookie("supabase_session", session?.access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: session?.expires_in ? session.expires_in * 1000 : undefined,
        });
        res.clearCookie("supabase_nonce");
        res.redirect(next);
    }
    catch (err) {
        console.error("Google OAuth callback error:", err.message);
        res.status(500).send("Failed to sign in with Google");
    }
};
exports.googleCallback = googleCallback;
