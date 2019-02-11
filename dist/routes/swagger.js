"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fs_1 = require("fs");
const path_1 = require("path");
const swaggerJSDoc = require("swagger-jsdoc");
class APIDocsRouter {
    constructor() {
        this.router = express_1.Router();
    }
    static getAllRoutes(dir, filelist) {
        const files = fs_1.readdirSync(dir);
        filelist = filelist || [];
        files.map((file) => {
            // filter out .map and hidden files
            if (file.search('.map') < 0 && file.search(/^\./) < 0) {
                if (fs_1.statSync(path_1.join(dir, file)).isDirectory()) {
                    filelist = APIDocsRouter.getAllRoutes(path_1.join(dir, file), filelist);
                }
                else {
                    if (file.search('.ts') > 0) {
                        filelist.push(path_1.join(dir, file));
                    }
                }
            }
        });
        return filelist;
    }
    getRouter() {
        /**
         * Generate API documentation from JSDOCS comments.
         *
         * Comments specifications.
         *
         * @link https://github.com/OAI/OpenAPI-Specification/tree/master/examples/v2.0/yaml
         */
        this.router.get('/', (_, response) => {
            const urls = [];
            APIDocsRouter.getAllRoutes(path_1.resolve(__dirname), urls);
            const options = {
                apis: urls,
                swaggerDefinition: {
                    info: {
                        description: 'API documentation.',
                        title: 'API',
                        version: '1.0.0',
                    },
                },
            };
            response.setHeader('Content-Type', 'application/json');
            response.send(swaggerJSDoc(options));
        });
        return this.router;
    }
}
exports.APIDocsRouter = APIDocsRouter;
