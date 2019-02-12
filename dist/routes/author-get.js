"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models/models");
const routes_helpers_1 = require("./routes-helpers");
const handler = async (event, context, callback) => {
    routes_helpers_1.setupLambda(event, context, callback);
    const result = await models_1.AuthorModel.getAll();
    return {
        body: JSON.stringify({ result }),
        statusCode: 200,
    };
};
exports.handler = handler;
