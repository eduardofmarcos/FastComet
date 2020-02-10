import Deliverymen from './../models/Deliverymen';
import Orders from './../models/Orders';
import Files from './../models/Files';
import filesController from './../controllers/filesController';
import { Op } from 'sequelize';
import { startOfDay, endOfDay, parseISO } from 'date-fns';
//import * as Yup from 'yup';

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
    console.log(res.locals);
    const orderToUpdate = await Orders.findByPk(req.params.orderId);
    const deliverymanId = req.params.id;

    const { start_date, end_date } = req.body;

    //check quantity of retrievers
    const checkQty = await Orders.count({
      where: {
        deliveryman_id: deliverymanId,
        end_date: null,

        start_date: {
          [Op.between]: [startOfDay(new Date()), endOfDay(new Date())]
        }
      }
    });
    console.log(checkQty);
    if (checkQty >= 5) {
      return res.status(401).json({
        message: 'You can not retrieve more than 5 parcels per day!'
      });
    }

    //console.log(orderToUpdate);
    if (req.body.end_date) {
      if (!orderToUpdate.signature_id) {
        return res.status(401).json({
          message: 'To finish the delivey you need to send a signature'
        });
      }
    }

    const orderUpdated = await orderToUpdate.update({
      start_date,
      end_date
    });
    return res.status(200).json(orderUpdated);
  }
}
export default new DeliverymanController();
