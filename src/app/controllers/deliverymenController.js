import Deliverymen from './../models/Deliverymen';
import * as Yup from 'yup';

class DeliverymenController {
  /** listing all deliverymen **/
  async index(req, res) {
    const allDeli = await Deliverymen.findAll();
    return res.status(200).json({
      message: allDeli
    });
  }

  /** creating a new deliveryman **/
  async store(req, res) {
    const deliData = req.body;

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      avatar_id: Yup.number(),
      email: Yup.string().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        message: 'Invalid Fields!'
      });
    }

    const checkUniqueEmail = await Deliverymen.findOne({
      where: { email: req.body.email }
    });
    if (checkUniqueEmail) {
      return res.status(400).json({
        message: 'This email is already registered!'
      });
    }

    const newDeli = await Deliverymen.create(deliData);
    return res.status(200).json(newDeli);
  }

  /** update a deliveryman **/
  async update(req, res) {
    const deliId = req.params.id;

    const deliToUpdate = await Deliverymen.findByPk(deliId);

    const schema = Yup.object().shape({
      name: Yup.string(),
      avatar_id: Yup.number(),
      email: Yup.string()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        message: 'Invalid Fields!'
      });
    }

    const checkDeliverymanExist = await Deliverymen.findOne({
      where: { id: deliId }
    });
    if (!checkDeliverymanExist) {
      return res.status(400).json({
        message: 'Deliveryman not found!'
      });
    }

    const deliUpdated = await deliToUpdate.update(req.body);
    return res.status(200).json({
      message: deliUpdated
    });
  }

  /** delete a deliveryman **/
  async delete(req, res) {
    try {
      const deliId = req.params.id;
      const deliToDelete = await Deliverymen.findByPk(deliId);

      const checkDeliverymanExist = await Deliverymen.findOne({
        where: { id: deliId }
      });
      if (!checkDeliverymanExist) {
        return res.status(400).json({
          message: 'Deliveryman not found!'
        });
      }

      const deliDeleted = await deliToDelete.destroy();
      return res.status(200).json({
        message: deliDeleted
      });
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}

export default new DeliverymenController();
