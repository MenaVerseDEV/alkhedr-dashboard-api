"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseStatus = exports.RequestStatus = void 0;
var RequestStatus;
(function (RequestStatus) {
    RequestStatus["FINISHED"] = "finished";
    RequestStatus["UN_WATCHED"] = "unwatched";
    RequestStatus["WATCHED_UN_FINISHED"] = "watched-un-finished";
})(RequestStatus || (exports.RequestStatus = RequestStatus = {}));
var ResponseStatus;
(function (ResponseStatus) {
    ResponseStatus["NOT_RESPONDED"] = "not-responded";
    ResponseStatus["PHONE_CLOSED"] = "phone-closed";
    ResponseStatus["INCORRECR_PHONE"] = "incorrect-phone";
    ResponseStatus["FINISHED"] = "finished";
    ResponseStatus["UN_AVAILABLE"] = "un-available";
    ResponseStatus["REPEATED"] = "repeated";
    ResponseStatus["NOT_STARTED"] = "not-started";
    ResponseStatus["HIGH_COMMITMENT"] = "high-commitment";
    ResponseStatus["LOW_COMMITMENT"] = "low-commitment";
    ResponseStatus["NOT_CREDITWORTHY"] = "not-creditworthy";
    ResponseStatus["NOT_SUTIABLE_SALARY"] = "non-suitable-salary";
})(ResponseStatus || (exports.ResponseStatus = ResponseStatus = {}));
