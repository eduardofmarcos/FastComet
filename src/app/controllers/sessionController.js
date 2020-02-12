import jwt from 'jsonwebtoken';
import User from './../models/Users';
import auth from './../../config/auth';
import * as Yup from 'yup';

class SessionController {
  /** login admin user **/
  async store(req, res) {
    const { email, password } = req.body;

    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(5)
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        message: 'Invalid Fields!'
      });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({
        message: 'User not found!'
      });
    }
    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ message: 'Incorrect password!' });
    }

    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email
      },

      token: jwt.sign({ id }, auth.secret, {
        expiresIn: auth.expiresIn
      })
    });
  }
}

export default new SessionController();
