import Sequelize from 'sequelize';
import databaseConfig from './../config/database';
import Destinos from './../app/models/Destinos';
import Users from './../app/models/Users';
import Deliverymen from './../app/models/Deliverymen';
import Files from './../app/models/Files';
import Orders from './../app/models/Orders';
import OrderProblems from './../app/models/OrderProblems';

const models = [Destinos, Users, Deliverymen, Files, Orders, OrderProblems];

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
