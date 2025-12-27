"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authlogin = void 0;
const supabase_1 = require("../lib/supabase");
const authlogin = async (email, password) => {
    try {
        const { data, error } = await supabase_1.supabase.auth.signInWithPassword({
            email,
            password
        });
        if (error)
            throw error;
        return data;
    }
    catch (error) {
        console.error("Error logging in: ", error.message);
        throw error;
    }
};
exports.authlogin = authlogin;
