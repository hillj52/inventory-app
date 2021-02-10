import request from 'supertest';
import { app } from '../app';
import { db } from './setup';
import { Roles } from '../models/user';

const email = 'mock@test.com';
const password = 'mockPassword';

export const signIn = async () => {
  const response = await request(app)
    .post('/api/users/signUp')
    .send({ email, password })
    .expect(201);

  const cookie = response.get('Set-Cookie');
  return cookie;
};

export const updateRoles = async (roles: Roles[]) => {
  const user = await db.collection('users').findOne({ email });
  if (!user) {
    return;
  }
  await db.collection('users').replaceOne({ email }, { ...user, roles });
  const user2 = await db.collection('users').findOne({ email });
  console.log(user2);
};
