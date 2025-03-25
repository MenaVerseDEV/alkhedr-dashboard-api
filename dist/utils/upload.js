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
exports.handleFileUpload = handleFileUpload;
const axios_1 = __importDefault(require("axios"));
const fs_1 = require("fs");
const uuid_1 = require("uuid");
function handleFileUpload(files) {
    return __awaiter(this, void 0, void 0, function* () {
        const fileArray = Object.values(files).map((fileArr) => fileArr[0]);
        const uploadPromises = fileArray.map((file) => __awaiter(this, void 0, void 0, function* () {
            if (!file || !file.path) {
                console.error("File path is undefined for the uploaded file.");
                return false;
            }
            const fileStream = (0, fs_1.createReadStream)(file.path);
            const fileName = `${(0, uuid_1.v4)()}-${file.originalname}`;
            try {
                const response = yield axios_1.default.put(`https://storage.bunnycdn.com/${process.env.STORAGE_NAME}/${fileName}`, fileStream, {
                    headers: {
                        AccessKey: process.env.STORAGE_KEY,
                    },
                });
                if (response.data) {
                    return {
                        file,
                        value: `https://alkhedr.b-cdn.net/${fileName}`,
                    };
                }
                else {
                    return false;
                }
            }
            catch (error) {
                console.error(`Failed to upload file ${files[file][0].originalname}:`, error);
                return false;
            }
        }));
        return Promise.all(uploadPromises);
    });
}
