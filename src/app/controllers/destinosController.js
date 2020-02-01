import Destinos from './../models/Destinos';
import * as Yup from 'yup';

class DestinosController {
  //store
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

    const checkUserExist = await Destinos.findOne({
      where: { name: req.body.name }
    });
    if (checkUserExist) {
      return res.status(400).json({
        message: 'User alredy exists!'
      });
    }

    const newDestinos = await Destinos.create(req.body);
    //console.log(newDestinos);
    res.status(200).json({
      newDestinos
    });
  }
  //index
  async index(req, res) {
    const allDestinos = await Destinos.findAll();
    res.status(200).json({
      allDestinos
    });
  }

  //update
  async update(req, res) {
    console.log(req.body.params);
    const destino = await Destinos.findByPk(req.params.id);
    const schema = Yup.object().shape({
      name: Yup.string(),
      street: Yup.string(),
      number: Yup.number(),
      complement: Yup.string(),
      state: Yup.string(),
      city: Yup.string(),
      cep: Yup.number()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        message: 'Invalid Fields!'
      });
    }

    const updatedDestino = await destino.update(req.body);
    //console.log(updatedDestino);
    res.status(200).json({
      updatedDestino
    });
  }
}

export default new DestinosController();
