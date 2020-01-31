import Sequelize, { Model } from 'sequelize';

class Destinos extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        street: Sequelize.STRING,
        number: Sequelize.INTEGER,
        complement: Sequelize.STRING,
        state: Sequelize.STRING,
        city: Sequelize.STRING,
        cep: Sequelize.INTEGER
      },
      {
        sequelize
      }
    );
    return this;
  }
}

export default Destinos;
