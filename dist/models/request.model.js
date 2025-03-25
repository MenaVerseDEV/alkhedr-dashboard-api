"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const request_interface_1 = require("../interfaces/request.interface");
const userSchema = new mongoose_1.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    carName: { type: String, required: true },
    carsNumber: { type: Number },
    city: { type: String, required: true },
    area: { type: String },
    totalIncome: { type: Number },
    totalOutcome: { type: Number },
    bankName: { type: String },
    note: { type: String },
    lastReplyDate: { type: Date },
    requestType: { type: String, required: true },
    requestStatus: { type: String, enum: request_interface_1.RequestStatus, default: request_interface_1.RequestStatus.UN_WATCHED },
    responseStatus: { type: String, enum: request_interface_1.ResponseStatus, default: request_interface_1.ResponseStatus.NOT_STARTED },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    seenHistory: [{
            _id: false,
            seenDate: { type: Date },
            seenBy: {
                type: mongoose_1.Schema.Types.ObjectId, ref: 'User'
            }
        }],
    actionHistory: [{
            _id: false,
            actionDate: { type: Date },
            actionBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
            action: { type: String },
        }],
    employeeNotes: [{
            _id: false,
            note: { type: String },
            noteBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
            noteDate: { type: Date }
        }]
}, { timestamps: true });
const Request = (0, mongoose_1.model)('Request', userSchema);
exports.default = Request;
