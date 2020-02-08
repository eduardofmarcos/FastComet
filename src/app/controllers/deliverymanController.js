import Deliverymen from './../models/Deliverymen';
import Orders from './../models/Orders';
import { Op } from 'sequelize';
import { parseISO } from 'date-fns';

class DeliverymanController {
  async index(req, res) {
    const deliverymanId = req.params.id;
    let where;

    const url = req.originalUrl;
    console.log(url);

    if (url.includes('delivered')) {
      //let end_date;
      where = {
        deliveryman_id: deliverymanId,
        end_date: {
          [Op.ne]: null
        }
      };
    } else {
      where = {
        deliveryman_id: deliverymanId,
        canceled_at: null,
        end_date: null
      };
    }

    const deliveryMan = await Orders.findAll({
      where
    });

    return res.status(200).json(deliveryMan);
  }

  async store(req, res) {
    const deliData = req.body;
    const newDeli = await Deliverymen.create(deliData);
    return res.status(200).json(newDeli);
  }

  async update(req, res) {
    const deliId = req.params.id;

    const deliToUpdate = await Deliverymen.findByPk(deliId);

    const deliUpdated = await deliToUpdate.update(req.body);
    return res.status(200).json({
      message: deliUpdated
    });
  }

  async delete(req, res) {
    const deliId = req.params.id;
    const deliToDelete = await Deliverymen.findByPk(deliId);

    const deliDeleted = await deliToDelete.destroy();
    return res.status(200).json({
      message: deliDeleted
    });
  }
}

export default new DeliverymanController();
