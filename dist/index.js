"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express_1.default.urlencoded({ extended: true }));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const requests_routes_1 = __importDefault(require("./routes/requests.routes"));
const dashboard_routes_1 = __importDefault(require("./routes/dashboard.routes"));
app.get('/', (req, res) => {
    res.json({
        message: 'API is working'
    });
});
app.use('/api/v1/users', user_routes_1.default);
app.use('/api/v1/requests', requests_routes_1.default);
app.use('/api/v1/dashboard', dashboard_routes_1.default);
app.use(errorHandler_1.default);
app.use((req, res) => {
    res.status(404).json({
        message: 'Resource not found'
    });
});
exports.default = app;
