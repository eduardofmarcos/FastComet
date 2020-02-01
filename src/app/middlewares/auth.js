import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import User from './../models/Users';

import authConfig from './../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;
  //console.log(authHeader);

  if (!authHeader) {
    return res.status(401).json({
      message: 'Token not provided'
    });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.userId = decoded.id;

    const checkUserExist = await User.findOne({
      where: { id: req.userId }
    });

    if (checkUserExist) {
      next();
    }
  } catch (error) {
    return res.status(401).json({
      message: 'Not Authorized'
    });
  }
};
