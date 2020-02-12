import Order from './../models/Orders';
import OrderProblems from './../models/OrderProblems';
import Deliverymen from './../models/Deliverymen';
import Mail from './../../lib/Mail';
import * as Yup from 'yup';

class orderProblemsController {
  /** list all order problems **/
  async index(req, res) {
    const allOrdersProblems = await OrderProblems.findAll();
    return res.status(200).json(allOrdersProblems);
  }

  /** show all order problems by ID **/
  async show(req, res) {
    const order_id = req.params.id;

    const checkOrderExist = await Order.findOne({
      where: { id: order_id }
    });
    if (!checkOrderExist) {
      return res.status(400).json({
        message: 'Order not found!'
      });
    }

    const allOrdersProblemsbyId = await OrderProblems.findAll({
      where: {
        order_id
      }
    });
    return res.status(200).json(allOrdersProblemsbyId);
  }

  /** creating new order problem **/
  async store(req, res) {
    const orderToProblemId = req.params.id;

    const schema = Yup.object().shape({
      description: Yup.string().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        message: 'Invalid Fields!'
      });
    }

    const checkOrderExist = await Order.findOne({
      where: { id: orderToProblemId }
    });
    if (!checkOrderExist) {
      return res.status(400).json({
        message: 'Order not found!'
      });
    }

    const newProblem = await OrderProblems.create({
      order_id: orderToProblemId,
      description: req.body.description
    });

    return res.status(201).json(newProblem);
  }

  async delete(req, res) {
    /** deleting a order by problem id **/
    const problemId = req.params.problemId;

    const problemToDelete = await OrderProblems.findByPk(problemId);

    const checkOrderProblemExist = await OrderProblems.findOne({
      where: { id: problemId }
    });
    if (!checkOrderProblemExist) {
      return res.status(400).json({
        message: 'Order problem not found!'
      });
    }

    const idDescription = problemToDelete.description;
    const orderInfo = await Order.findOne({
      where: {
        id: problemToDelete.order_id
      }
    });

    const deliverymanInfo = await Deliverymen.findOne({
      where: {
        id: orderInfo.deliveryman_id
      }
    });

    //console.log(deliverymanInfo);
    //onsole.log(idDescription);
    //console.log(orderInfo.product);

    /** sending a email to inform the cancellation **/
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
