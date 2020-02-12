import Order from './../models/Orders';
import { isBefore, isAfter, parseISO } from 'date-fns';
import Deliverymen from './../models/Deliverymen';
import Mail from './../../lib/Mail';
import * as Yup from 'yup';

class orderController {
  /** list all orders **/
  async index(req, res) {
    const allOrders = await Order.findAll();
    return res.status(200).json(allOrders);
  }

  /** creating new order **/
  async store(req, res) {
    const orderData = req.body;

    const schema = Yup.object().shape({
      destinos_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
      signature_id: Yup.number(),
      product: Yup.string().required(),
      canceled_at: Yup.date(),
      start_date: Yup.date(),
      end_date: Yup.date()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        message: 'Invalid Fields!'
      });
    }

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

    /** sending a email to inform the new order **/
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

  /** updating the order by order ID **/
  async update(req, res) {
    const orderId = req.params.id;
    const orderToUpdate = await Order.findByPk(orderId);
    const dataToUpdate = req.body;

    const schema = Yup.object().shape({
      destinos_id: Yup.number(),
      deliveryman_id: Yup.number(),
      signature_id: Yup.number(),
      product: Yup.string(),
      canceled_at: Yup.date(),
      start_date: Yup.date(),
      end_date: Yup.date()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        message: 'Invalid Fields!'
      });
    }
    const orderUpdated = await orderToUpdate.update(dataToUpdate);
    return res.status(200).json(orderUpdated);
  }

  /** deleting the order by ID **/
  async delete(req, res) {
    const orderId = req.params.id;
    const orderTodelete = await Order.findByPk(orderId);
    await orderTodelete.destroy();
    return res.status(200).json();
  }
}

export default new orderController();
