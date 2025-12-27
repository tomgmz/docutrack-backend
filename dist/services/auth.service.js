"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAuthUser = void 0;
const supabase_1 = require("../lib/supabase");
const createAuthUser = async (email, password) => {
    try {
        const { data, error } = await supabase_1.supabase.auth.signUp({
            email,
            password,
        });
        if (error)
            throw error;
        return data.user?.id;
    }
    catch (err) {
        console.error("Error creating auth user: ", err.message);
        throw err;
    }
};
exports.createAuthUser = createAuthUser;
