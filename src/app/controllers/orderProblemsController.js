import Order from './../models/Orders';
import OrderProblems from './../models/OrderProblems';
import Deliverymen from './../models/Deliverymen';
import Mail from './../../lib/Mail';

class orderProblemsController {
  async index(req, res) {
    const allOrdersProblems = await OrderProblems.findAll();
    return res.status(200).json(allOrdersProblems);
  }

  async show(req, res) {
    const order_id = req.params.id;
    const allOrdersProblemsbyId = await OrderProblems.findAll({
      where: {
        order_id
      }
    });
    return res.status(200).json(allOrdersProblemsbyId);
  }

  async store(req, res) {
    const orderToProblemId = req.params.id;

    const newProblem = await OrderProblems.create({
      order_id: orderToProblemId,
      description: req.body.description
    });

    return res.status(201).json(newProblem);
  }

  async update(req, res) {
    const orderId = req.params.id;
    const orderToUpdate = await Order.findByPk(orderId);
    const dataToUpdate = req.body;
    const orderUpdated = await orderToUpdate.update(dataToUpdate);
    return res.status(200).json(orderUpdated);
  }

  async delete(req, res) {
    const problemId = req.params.problemId;
    console.log(problemId);
    const problemToDelete = await OrderProblems.findByPk(problemId);

    const idDescription = problemToDelete.description;
    const orderInfo = await Order.findOne({
      where: {
        id: problemToDelete.order_id
      }
    });
    //deliveryman_id
    const deliverymanInfo = await Deliverymen.findOne({
      where: {
        id: orderInfo.deliveryman_id
      }
    });

    //console.log(deliverymanInfo);
    //onsole.log(idDescription);
    console.log(orderInfo.product);

    await Mail.sendMail({
      to: `${deliverymanInfo.name} < ${deliverymanInfo.email} >`,
      subject: `O produto ${orderInfo.product} abaixo foi cancelado: `,
      template: 'cancelParcel',
      context: {
        deliveryman: deliverymanInfo.name,
        product: orderInfo.product,
        problem: problemToDelete.description
      }
    });

    await problemToDelete.destroy();

    return res.status(200).json({ message: `${problemId} deleted` });
  }
}

export default new orderProblemsController();
