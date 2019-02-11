"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const author_model_1 = require("../../models/author-model");
class AuthorRouter {
    constructor() {
        this.router = express_1.Router();
    }
    getRouter() {
        /**
         * @swagger
         * /api/author:
         *   get:
         *     tags:
         *      - Author
         *     description:
         *      List of all authors registered in system.
         *     produces:
         *       - application/json
         *     responses:
         *       200:
         *         description: Authors
         *       400:
         *         description: Invalid request
         *       403:
         *         description: Forbidden
         */
        this.router.get('/author', async (request, response) => {
            const authors = await author_model_1.AuthorModel.find({}).exec();
            response.json(authors);
        });
        /**
         * @swagger
         * /api/author:
         *   post:
         *     tags:
         *      - Author
         *     description:
         *      Create new author.
         *     produces:
         *       - application/json
         *     responses:
         *       200:
         *         description: Author
         *       400:
         *         description: Invalid request
         *       403:
         *         description: Forbidden
         */
        this.router.post('/author', async (request, response) => {
            const author = await author_model_1.AuthorModel.create(request.body);
            response.status(200).json(author);
        });
        return this.router;
    }
}
exports.AuthorRouter = AuthorRouter;
