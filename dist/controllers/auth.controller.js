"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testing = exports.profile = exports.signin = exports.signup = void 0;
const users_model_1 = __importDefault(require("../models/users.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Saving a new user
    const user = new users_model_1.default({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });
    user.password = yield user.encryptPassword(user.password);
    const savedUser = yield user.save();
    console.log(savedUser);
    // Token
    const token = jsonwebtoken_1.default.sign({ _id: savedUser._id }, process.env.TOKEN_SECRET || "tokentest");
    res.header("auth-token", token).json(savedUser);
    res.send("signup");
});
exports.signup = signup;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield users_model_1.default.findOne({ email: req.body.email });
    if (!user)
        return res.status(400).json("Email or password is wrong");
    const correctPassword = yield bcryptjs_1.default.compare(req.body.password, user.password);
    if (!correctPassword)
        return res.status(400).json("Invalid Password");
    const token = jsonwebtoken_1.default.sign({ _id: user._id }, process.env.TOKEN_SECRET || "tokentest", {
        expiresIn: 60 * 60 * 24
    });
    res.header("auth-token", token).json(user);
    // userSchema.methods.validatePassword = async function (password: string): Promise<boolean> {
    //     return await bcrypt.compare(password, password);
    // };
    // const correctPassword:boolean = await user.validatePassword(req.body.password)
    // if(!correctPassword) return res.status(400).json("Invalid Password");
    // res.send("Login")
});
exports.signin = signin;
const profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield users_model_1.default.findById(req.userId, { password: 0 });
    if (!user)
        return res.status(404).json("No user found");
    res.json(user);
});
exports.profile = profile;
const testing = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json("Privity");
});
exports.testing = testing;
//# sourceMappingURL=auth.controller.js.map