"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models/models");
const routes_helpers_1 = require("./routes-helpers");
exports.controller = (bodyParams) => {
    return new models_1.AuthorModel(bodyParams).save();
};
exports.handler = routes_helpers_1.getAWSLambdaHandler(exports.controller);
