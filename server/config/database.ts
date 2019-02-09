import { Mockgoose } from 'mockgoose-fix';
import * as mongoose from 'mongoose';

(mongoose as any).Promise = global.Promise;

if (process.env.NODE_ENV === 'testing') {
  const mockgoose = new Mockgoose(mongoose);
  mockgoose.helper.setDbVersion('3.4.3');

  mockgoose.prepareStorage().then(
    (): void => {
      mongoose.connect('mongodb://example.com:23400/TestingDB', {
        useNewUrlParser: true,
      });
    },
  );
} else {
  mongoose.connect(
    'mongodb://josemontesp:testpassword1@ds030500.mlab.com:30500/test-ts-node-api',
    { useNewUrlParser: true },
  );
}

export { mongoose };
