import request from 'supertest';
import { app } from '../../../app';
import { signIn, updateRoles } from '../../../test/auth-helper';
import { Roles } from '../../../models/user';

it('can only be accessed if a user is signed in', async () => {
  await request(app).post('/api/sources/addSource').send({}).expect(401);
});

it('returns a status other than 401 if the user is logged in ', async () => {
  const cookie = await signIn();
  await updateRoles([]);
  const response = await request(app)
    .post('/api/sources/addSource')
    .set('Cookie', cookie)
    .send({ name: 'mockSource' });

  expect(response.status).not.toEqual(401);
});
