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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({
    path: ".env"
});
const _1 = __importDefault(require("."));
mongoose_1.default.connect((_c = (_a = process.env.DB_URI) === null || _a === void 0 ? void 0 : _a.replace('<db_password>', (_b = process.env.DB_PASS) !== null && _b !== void 0 ? _b : '')) !== null && _c !== void 0 ? _c : '').then(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Database Is Connected ✅");
})).catch(err => {
    console.error("Failed to connect to database", err);
});
_1.default.listen(process.env.PORT || 3000, () => {
    console.log("Server is running on port 3000");
});
