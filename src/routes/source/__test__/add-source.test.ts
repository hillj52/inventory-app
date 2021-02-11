import request from 'supertest';
import { app } from '../../../app';
import { signIn } from '../../../test/auth-helper';
import { Roles } from '../../../models/user';

it('can only be accessed if a user is signed in', async () => {
  await request(app).post('/api/sources').send({}).expect(401);
});

it('returns a status of 401 if the user is logged in but does not have role', async () => {
  const cookie = await signIn({ roles: [] });
  const response = await request(app)
    .post('/api/sources')
    .set('Cookie', cookie)
    .send({ name: 'mockSource' });

  expect(response.status).toEqual(401);
});

it('returns a status other than 401 if the user is logged in with correct roles', async () => {
  const cookie = await signIn({ roles: [Roles.EDIT_INVENTORY] });
  const response = await request(app)
    .post('/api/sources')
    .set('Cookie', cookie)
    .send({ name: 'mockSource' });

  expect(response.status).not.toEqual(401);
});
