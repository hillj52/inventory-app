import request from 'supertest';
import { app } from '../../../app';
import { signIn } from '../../../test/auth-helper';
import { generateId } from '../../../test/mongo-helper';
import { Roles } from '../../../models/user';

it('returns a 401 if the user is not logged in', async () => {
  const id = generateId();
  await request(app).get(`/api/sources/${id}`).send().expect(401);
});

it('returns a 401 if the user does not have the proper role', async () => {
  const cookie = signIn({ roles: [] });
  const id = generateId();
  await request(app)
    .get(`/api/sources/${id}`)
    .set('Cookie', cookie)
    .send()
    .expect(401);
});

it('returns the source if it exists for valid user', async () => {
  const cookie = signIn({
    roles: [Roles.VIEW_INVENTORY, Roles.EDIT_INVENTORY],
  });
  const addResponse = await request(app)
    .post('/api/sources')
    .set('Cookie', cookie)
    .send({ name: 'mockSource' })
    .expect(201);

  const response = await request(app)
    .get(`/api/sources/${addResponse.body.id}`)
    .set('Cookie', cookie)
    .send()
    .expect(200);
  expect(response.body.name).toEqual('mockSource');
});
