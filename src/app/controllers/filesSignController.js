import File from './../models/Files';
import Orders from './../models/Orders';

class FileController {
  async store(req, res, next) {
    const name = req.file.originalname;
    const path = req.file.filename;

    const file = await File.create({
      name,
      path
    });
    res.status(201).json(req.file);

    const item = await File.findAll({
      limit: 1,
      order: [['createdAt', 'DESC']]
    });
    const id = item[0].dataValues.id;

    const orderToupdate = await Orders.findByPk(req.params.orderId);

    const sign = await orderToupdate.update({
      signature_id: id
    });
  }
}
export default new FileController();
