import * as jwt from 'jsonwebtoken';
import User from '../models/car';
import DataStoredInToken from '../interfaces/dataStoredInToken';

async function user_token(token) {
  try {
    if (!token) {
      new Error('token not provided');
    }

    const verificationResponse = (await jwt.verify(
      token,
      process.env.JWT_SECRET
    )) as DataStoredInToken;

    if (!verificationResponse) {
      throw new Error('unknown user');
    }

    const user = await User.findById(verificationResponse.id);

    if (!user) {
      throw new Error('unknown user');
    }

    return user._id;
  } catch (error) {
    throw error;
  }
}

export default user_token;
