import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'mongoDb',
  connector: 'mongodb',
  url: 'mongodb+srv://databaseUsers:123@databasedb.luc84.mongodb.net/database',
  host: 'localhost',
  port: 27017,
  user: 'databaseUsers',
  password: '123',
  database: 'database',
  useNewUrlParser: true
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class MongoDbDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'mongoDb';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.mongoDb', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
