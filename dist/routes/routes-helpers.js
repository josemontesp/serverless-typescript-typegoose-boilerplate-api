"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../errors");
exports.setupLambda = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
};
exports.parseBody = (body) => {
    try {
        return JSON.parse(body);
    }
    catch (error) {
        throw new errors_1.BodyParserError(error);
    }
};
exports.handleError = (error, status = 500) => {
    const statusCode = error.statusCode || status;
    return {
        body: JSON.stringify({ statusCode, message: error.message }),
        statusCode,
    };
};
exports.getHandler = (controller) => {
    return async (event, context, callback) => {
        try {
            exports.setupLambda(event, context, callback);
            const bodyParams = exports.parseBody(event.body);
            const result = await controller(bodyParams);
            return {
                body: JSON.stringify(result),
                statusCode: 200,
            };
        }
        catch (error) {
            return exports.handleError(error);
        }
    };
};
