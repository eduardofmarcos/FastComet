import Orders from './../models/Orders';
import Deliverymen from './../models/Deliverymen';
import { Op } from 'sequelize';
import { startOfDay, endOfDay, parseISO } from 'date-fns';

/** deliveryman functionalities **/

class DeliverymanController {
  /** list all parcels to delivery/delivered by deliveryman ID **/
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

    const checkDeliverymanExist = await Deliverymen.findOne({
      where: { id: deliverymanId }
    });
    if (!checkDeliverymanExist) {
      return res.status(400).json({
        message: 'Deliveryman not found!'
      });
    }

    const deliveryMan = await Orders.findAll({
      where
    });

    return res.status(200).json(deliveryMan);
  }

  /** updating a deliveryman order **/
  async update(req, res) {
    const orderToUpdate = await Orders.findByPk(req.params.orderId);
    const deliverymanId = req.params.id;

    const checkDeliverymanExist = await Deliverymen.findOne({
      where: { id: deliverymanId }
    });
    if (!checkDeliverymanExist) {
      return res.status(400).json({
        message: 'Deliveryman not found!'
      });
    }

    const checkOrderExist = await Orders.findOne({
      where: { id: req.params.orderId }
    });
    if (!checkOrderExist) {
      return res.status(400).json({
        message: 'Order not found!'
      });
    }

    const checkOrderDeliveryman = orderToUpdate.deliveryman_id;

    if (checkOrderDeliveryman !== Number(deliverymanId)) {
      return res
        .status(401)
        .json({ message: 'Order does not match deliveryman!' });
    }

    const { start_date, end_date } = req.body;

    //check quantity of retrievers per day
    const checkQty = await Orders.count({
      where: {
        deliveryman_id: deliverymanId,
        end_date: null,

        start_date: {
          [Op.between]: [startOfDay(new Date()), endOfDay(new Date())]
        }
      }
    });

    if (checkQty >= 5) {
      return res.status(401).json({
        message: 'You can not retrieve more than 5 parcels per day!'
      });
    }

    //obs.: if a delivery is trying to update a order, and there is a end_date, it will require a signature_id first
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
