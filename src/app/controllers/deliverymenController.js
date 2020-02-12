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

    const deliUpdated = await deliToUpdate.update(req.body);
    return res.status(200).json({
      message: deliUpdated
    });
  }

  /** delete a deliveryman **/
  async delete(req, res) {
    const deliId = req.params.id;
    const deliToDelete = await Deliverymen.findByPk(deliId);

    const deliDeleted = await deliToDelete.destroy();
    return res.status(200).json({
      message: deliDeleted
    });
  }
}

export default new DeliverymenController();
