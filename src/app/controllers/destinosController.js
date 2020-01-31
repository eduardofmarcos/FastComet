import Destinos from './../models/Destinos';
import * as Yup from 'yup';

class DestinosController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.number().required(),
      complement: Yup.string(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      cep: Yup.number().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        message: 'Invalid Fields!'
      });
    }

    const newDestinos = await Destinos.create(req.body);
    console.log(newDestinos);
    res.status(200).json({
      newDestinos
    });
  }

  async index(req, res) {
    const allDestinos = await Destinos.findAll();
    res.status(200).json({
      allDestinos
    });
  }
}

export default new DestinosController();
