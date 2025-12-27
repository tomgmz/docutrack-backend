"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const authGoogle_routes_1 = __importDefault(require("./routes/authGoogle.routes"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
// Middleware to parse JSON
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: ["http://localhost:3000", "https://docutracker.vercel.app"],
    credentials: true,
    exposedHeaders: ["x-access-token"],
}));
// Root route
app.get("/", (req, res) => {
    console.log(req.cookies);
    res.send("Server running");
});
// Auth routes
app.use("/api", auth_routes_1.default);
app.use("/api", authGoogle_routes_1.default);
exports.default = app;
