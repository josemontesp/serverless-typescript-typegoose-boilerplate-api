"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../config/database");
const models_1 = require("../models/models");
exports.handler = async (event, context, callback) => {
    const result = await models_1.AuthorModel.getAll();
    await database_1.mongoose.disconnect();
    return {
        body: JSON.stringify({ result }),
        statusCode: 200,
    };
};
// exports.handler(null, null, (err, res) => console.log(err, res));
