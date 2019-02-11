"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const typegoose_1 = require("typegoose");
const database_1 = require("../config/database");
let BaseModel = class BaseModel extends typegoose_1.Typegoose {
    constructor() {
        super(...arguments);
        this.timestamps = true;
    }
    getModelForClass(t, options) {
        return super.getModelForClass(t, Object.assign({ existingMongoose: database_1.mongoose, schemaOptions: {
                timestamps: this.timestamps,
            } }, options));
    }
};
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], BaseModel.prototype, "_id", void 0);
BaseModel = __decorate([
    typegoose_1.pre('save', async function (next) {
        if (this._id === undefined || this._id === null) {
            this._id = mongoose_1.Types.ObjectId();
        }
        next();
    })
], BaseModel);
exports.BaseModel = BaseModel;
