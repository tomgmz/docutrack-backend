"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
const validateRequest = (schema) => (req, res, next) => {
    const result = schema.safeParse(req);
    if (!result.success) {
        return res.status(400).json({ errors: result.error.format() });
    }
    next();
};
exports.validateRequest = validateRequest;
