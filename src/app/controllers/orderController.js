import Order from './../models/Orders';
import { isBefore, isAfter, parseISO } from 'date-fns';
import Deliverymen from './../models/Deliverymen';
import Mail from './../../lib/Mail';

class orderController {
  async index(req, res) {
    const allOrders = await Order.findAll();
    return res.status(200).json(allOrders);
  }

  async store(req, res) {
    const orderData = req.body;

    //check hours
    if (req.body.start_date) {
      const initialHour = '2018-01-01T08:00:00.000Z';
      const endHour = '2018-01-01T18:00:00.000Z';
      const { start_date } = req.body;
      if (
        isBefore(parseISO(start_date), parseISO(initialHour)) ||
        isAfter(parseISO(start_date), parseISO(endHour))
      ) {
        return res.status(400).json({
          message: 'Starts dates should be between 08:00 and 18:00'
        });
      }
    }

    const newOrder = await Order.create(orderData);
    const deliveryman = await Deliverymen.findByPk(newOrder.deliveryman_id);
    const deliverymanName = deliveryman.name;
    const deliverymanEmail = deliverymanName.email;
    const product = newOrder.product;

    await Mail.sendMail({
      to: `${deliverymanName} < ${deliverymanEmail} >`,
      subject: `O produto ${product} ja esta disponivel pra retirada`,
      template: 'newParcel',
      context: {
        deliveryman: deliverymanName,
        product: product
      }
    });

    return res.status(400).json(newOrder);
  }

  async update(req, res) {
    const orderId = req.params.id;
    const orderToUpdate = await Order.findByPk(orderId);
    const dataToUpdate = req.body;
    const orderUpdated = await orderToUpdate.update(dataToUpdate);
    return res.status(200).json(orderUpdated);
  }

  async delete(req, res) {
    const orderId = req.params.id;
    const orderTodelete = await Order.findByPk(orderId);
    await orderTodelete.destroy();
    return res.status(200).json();
  }
}

export default new orderController();
