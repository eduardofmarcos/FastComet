import File from './../models/Files';

class FileController {
  async store(req, res) {
    const name = req.file.originalname;
    const path = req.file.filename;

    const file = await File.create({
      name,
      path
    });
    res.status(201).json(req.file);
  }
}
export default new FileController();
