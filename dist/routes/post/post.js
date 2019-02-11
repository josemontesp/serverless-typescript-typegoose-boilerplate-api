"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const author_model_1 = require("../../models/author-model");
const post_model_1 = require("../../models/post-model");
class PostRouter {
    static routes() {
        return express_1.Router()
            .get('/post', (request, response) => __awaiter(this, void 0, void 0, function* () {
            const posts = yield post_model_1.Post.find({})
                .populate('author')
                .exec();
            response.json(posts);
        }))
            .post('/post', (request, response) => __awaiter(this, void 0, void 0, function* () {
            const data = request.body;
            const author = yield author_model_1.AuthorModel.findOne().exec();
            data.author = author._id;
            const post = yield post_model_1.Post.create(data);
            response.json(post);
        }));
    }
}
exports.PostRouter = PostRouter;
//# sourceMappingURL=../../../server/dist/routes/post/post.js.map