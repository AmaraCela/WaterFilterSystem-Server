'use strict';

import { readdirSync } from 'fs';
import { basename as _basename } from 'path';
import Sequelize, { DataTypes } from 'sequelize';
import { env as _env } from 'process';
import config from '../config/config.js';
const basename = _basename(new URL(import.meta.url).pathname);
const env = _env.NODE_ENV || 'development';

const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(_env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

readdirSync(new URL('.', import.meta.url).pathname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(new URL(file, import.meta.url))(sequelize, DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
