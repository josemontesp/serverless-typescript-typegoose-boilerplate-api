"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = require("body-parser");
const express = require("express");
const path = require("path");
const author_1 = require("./routes/author/author");
const swagger_1 = require("./routes/swagger");
const app = express();
app.use(body_parser_1.json());
app.use(body_parser_1.urlencoded({
    extended: true,
}));
app.get('/', (request, response) => {
    response.json({
        name: 'Express application',
    });
});
app.use((err, request, response, next) => {
    response.status(err.status || 500);
    response.json({
        error: 'Server error',
    });
});
app.use('/api', new author_1.AuthorRouter().getRouter());
app.use('/api/swagger', new swagger_1.APIDocsRouter().getRouter());
app.use('/docs', express.static(path.join(__dirname, './assets/swagger')));
const server = app.listen(process.env.PORT || 3000, () => console.log('api started!'));
exports.server = server;
