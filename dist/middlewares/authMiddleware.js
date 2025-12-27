"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.supabaseAuthMiddleware = void 0;
const supabase_1 = require("../lib/supabase");
const supabaseAuthMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const token = authHeader.split(" ")[1];
    const { data, error } = await supabase_1.supabase.auth.getUser(token);
    if (error) {
        console.log("Failed to get supabase auth user: ", error);
        return res.status(401).json({ message: "Unauthorized" });
    }
    else {
        const authId = data.user?.id;
        return next();
    }
};
exports.supabaseAuthMiddleware = supabaseAuthMiddleware;
