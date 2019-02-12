"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
// tslint:disable:max-classes-per-file
class HTTPError extends Error {
    constructor() {
        super(...arguments);
        this.statusCode = http_status_codes_1.INTERNAL_SERVER_ERROR;
    }
}
exports.HTTPError = HTTPError;
class BodyParserError extends HTTPError {
    constructor() {
        super(...arguments);
        this.statusCode = http_status_codes_1.UNPROCESSABLE_ENTITY;
    }
}
exports.BodyParserError = BodyParserError;
