import Sequelize from 'sequelize';
import databaseConfig from './../config/database';
import Destinos from './../app/models/Destinos';
import Users from './../app/models/Users';
import Deliveriesmen from './../app/models/Deliveriesmen';
import Files from './../app/models/Files';

const models = [Destinos, Users, Deliveriesmen, Files];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));
    models.map(
      model => model.associate && model.associate(this.connection.models)
    );
  }
}

export default new Database();
