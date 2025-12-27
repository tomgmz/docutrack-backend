"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProfile = void 0;
const supabase_1 = require("../lib/supabase");
const createProfile = async (profileData) => {
    const { data, error } = await supabase_1.supabase
        .from("profiles")
        .insert([profileData])
        .select()
        .single(); // returns the inserted row directly
    if (error)
        throw error;
    return data;
};
exports.createProfile = createProfile;
