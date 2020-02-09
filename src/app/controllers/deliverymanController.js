import Deliverymen from './../models/Deliverymen';
import Orders from './../models/Orders';
import { Op } from 'sequelize';
import * as Yup from 'yup';

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

  async update(req, res) {
    const orderToUpdate = await Orders.findByPk(req.params.orderId);

    const dataToUpdate = req.body;
    let schema;
    if (req.body.end_date) {
       schema = Yup.object().shape({
        signature_id: Yup.number()
          .integer()
          .required()
      });
      if (!(await schema.isValid(dataToUpdate))) {
        return res.status(400).json({ message: 'Need a valid signature' });
      }
    }

    

    const orderUpdated = await orderToUpdate.update(dataToUpdate);
    return res.status(200).json({ orderUpdated });
  }
}

export default new DeliverymanController();
