"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../errors");
/** Initial setup for the AWS lambda function. */
exports.setupLambda = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
};
/**
 * Parses the body of the request and throws BodyParserError if not successful.
 */
exports.parseBody = (body) => {
    try {
        return JSON.parse(body);
    }
    catch (error) {
        throw new errors_1.BodyParserError(error);
    }
};
/** Constructs an error response based on the provided error object. */
exports.getErrorResponse = (error, status = 500) => {
    const statusCode = error.statusCode || status;
    return {
        body: JSON.stringify({ statusCode, message: error.message }),
        statusCode,
    };
};
/**
 * Receives a controller function and returns a handler function usable as an
 * AWS lambda function. Useful because it abstracts all the setup logic and
 * error handling.
 */
exports.getAWSLambdaHandler = (controller) => {
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
            return exports.getErrorResponse(error);
        }
    };
};
