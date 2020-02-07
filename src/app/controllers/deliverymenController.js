import Deliverymen from './../models/Deliverymen';

class DeliverymenController {
  async index(req, res) {
    const allDeli = await Deliverymen.findAll();
    return res.status(200).json({
      message: allDeli
    });
  }

  async store(req, res) {
    const deliData = req.body;
    const newDeli = await Deliverymen.create(deliData);
    return res.status(200).json(newDeli);
  }

  async update(req, res) {
    const deliId = req.params.id;

    const deliToUpdate = await Deliverymen.findByPk(deliId);

    const deliUpdated = await deliToUpdate.update(req.body);
    return res.status(200).json({
      message: deliUpdated
    });
  }

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
