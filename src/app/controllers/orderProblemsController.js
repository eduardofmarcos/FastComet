import Order from './../models/Orders';
import OrderProblems from './../models/OrderProblems';

class orderProblemsController {
  async index(req, res) {
    const allOrdersProblems = await OrderProblems.findAll();
    return res.status(200).json(allOrdersProblems);
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
    const orderId = req.params.id;
    const orderTodelete = await Order.findByPk(orderId);
    await orderTodelete.destroy();
    return res.status(200).json();
  }
}

export default new orderProblemsController();
