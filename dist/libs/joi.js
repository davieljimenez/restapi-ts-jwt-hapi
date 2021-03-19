"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.siginValidation = exports.signupValidation = void 0;
const joi_1 = __importDefault(require("@hapi/joi"));
const signupValidation = (data) => {
    const UserSchema = joi_1.default.object({
        username: joi_1.default
            .string()
            .min(4)
            .max(30)
            .required(),
        email: joi_1.default
            .string()
            .required()
            .lowercase()
            .email(),
        password: joi_1.default
            .string()
            .min(6)
            .required()
    });
    return UserSchema.validate(data);
};
exports.signupValidation = signupValidation;
const siginValidation = (data) => {
    const UserSchema = joi_1.default.object({
        email: joi_1.default
            .string()
            .required()
            .lowercase()
            .email(),
        password: joi_1.default
            .string()
            .min(6)
            .required()
    });
    return UserSchema.validate(data);
};
exports.siginValidation = siginValidation;
//# sourceMappingURL=joi.js.map