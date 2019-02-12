"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mockgoose_fix_1 = require("mockgoose-fix");
const mongoose = require("mongoose");
exports.mongoose = mongoose;
mongoose.Promise = global.Promise;
if (process.env.NODE_ENV === 'testing') {
    const mockgoose = new mockgoose_fix_1.Mockgoose(mongoose);
    mockgoose.helper.setDbVersion('3.4.3');
    mockgoose.prepareStorage().then(() => {
        mongoose.connect('mongodb://example.com:23400/TestingDB', {
            useNewUrlParser: true,
        });
    });
}
else {
    mongoose
        .connect('mongodb://josemontesp:testpassword1@ds030500.mlab.com:30500/test-ts-node-api', { useNewUrlParser: true })
        .then(() => console.log('database connected!'));
}
