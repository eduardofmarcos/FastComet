import User from './../models/Users';
import * as Yup from 'yup';

//both methods (store and update)need to be loggged in

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(5)
    });
/**creating new user **/

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        message: 'Invalid Fields!'
      });
    }

    const checkUserExist = await User.findOne({
      where: { email: req.body.email }
    });
    if (checkUserExist) {
      return res.status(400).json({
        message: 'User alredy exists'
      });
    }

    const { id, name, email } = await User.create(req.body);
    //console.log(newUser);

    res.status(201).json({
      id,
      name,
      email
    });
  }

  /**updating a user **/
  
}

export default new UserController();
