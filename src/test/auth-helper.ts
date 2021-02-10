import jwt from 'jsonwebtoken';
import { Roles } from '../models/user';

interface SignInOptions {
  id?: string;
  roles?: Roles[];
}

export const signIn = ({ id = 'mockTestId', roles = [] }: SignInOptions) => {
  const payload = {
    id,
    email: 'mock@test.com',
    roles,
  };

  const token = jwt.sign(payload, process.env.JWT_KEY!);
  const session = { jwt: token };
  const sessionJSON = JSON.stringify(session);
  const base64 = Buffer.from(sessionJSON).toString('base64');
  return [`express:sess=${base64}`];
};
