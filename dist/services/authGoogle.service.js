"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exchangeGoogleCode = exports.generateGoogleNonce = void 0;
const supabase_1 = require("../lib/supabase");
const crypto_1 = __importDefault(require("crypto"));
const generateGoogleNonce = () => {
    const raw = crypto_1.default.randomBytes(32).toString("base64url");
    const hashed = crypto_1.default.createHash("sha256").update(raw).digest("hex");
    return { raw, hashed };
};
exports.generateGoogleNonce = generateGoogleNonce;
const exchangeGoogleCode = async (code) => {
    const { data, error } = await supabase_1.supabase.auth.exchangeCodeForSession(code);
    if (error)
        throw new Error(error.message);
    return data.session;
};
exports.exchangeGoogleCode = exchangeGoogleCode;
