"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (asyncFn) => {
    return (req, res, next) => {
        asyncFn(req, res, next).catch(next);
    };
};
