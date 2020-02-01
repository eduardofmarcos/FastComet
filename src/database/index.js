import Sequelize from 'sequelize';
import databaseConfig from './../config/database';
import Destinos from './../app/models/Destinos';
import Users from './../app/models/Users';

const models = [Destinos, Users];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));
  }
}

export default new Database();
