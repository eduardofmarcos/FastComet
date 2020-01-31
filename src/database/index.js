import Sequelize from 'sequelize';
import databaseConfig from './../config/database';
import Destinos from './../app/models/Destinos';

const models = [Destinos];

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
