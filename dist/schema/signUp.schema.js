"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUpSchema = void 0;
const zod_1 = require("zod");
exports.signUpSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email({ message: "Invalid email address" }),
        password: zod_1.z
            .string()
            .min(6, { message: "Password must be at least 6 characters" })
            .max(64, { message: "Password cannot exceed 64 characters" }),
        username: zod_1.z.string().min(1, { message: "Username is required" }),
        first_name: zod_1.z.string().optional(),
        last_name: zod_1.z.string().optional(),
        middle_name: zod_1.z.string().optional(),
    }),
});
