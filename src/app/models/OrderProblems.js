import Sequelize, { Model } from 'sequelize';

class OrderProblems extends Model {
  static init(sequelize) {
    super.init(
      {
        order_id: Sequelize.INTEGER,
        description: Sequelize.STRING
      },
      {
        sequelize
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Order, {
      foreignKey: 'order_id',
      as: 'orderProblems'
    });
  }
}

export default OrderProblems;
