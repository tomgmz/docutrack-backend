"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authSignOut = void 0;
const supabase_1 = require("../lib/supabase");
const authSignOut = async () => {
    try {
        const { error } = await supabase_1.supabase.auth.signOut();
        if (error)
            throw new Error(error.message);
    }
    catch (err) {
        console.error("Error signing out:", err.message);
        throw new Error("Unable to sign out. Please try again.");
    }
};
exports.authSignOut = authSignOut;
