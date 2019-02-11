"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const database_1 = require("../config/database");
const schema = new mongoose_1.Schema({
    author: {
        ref: 'Author',
        type: mongoose_1.Schema.Types.ObjectId,
    },
    create: {
        default: Date.now,
        type: Date,
    },
    description: String,
    title: String,
});
schema.static('findAllByAuthor', (author) => {
    return exports.Post.find({ author })
        .lean()
        .exec();
});
exports.Post = database_1.mongoose.model('Post', schema);
//# sourceMappingURL=../../server/dist/models/post-model.js.map