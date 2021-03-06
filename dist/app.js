"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const app = express_1.default();
// Settings
app.set("port", 16000);
// Middlewares
app.use(morgan_1.default("dev"));
app.use(express_1.default.json());
// Routes
app.use("/apiv1/auth", auth_route_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map