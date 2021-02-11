import request from 'supertest';
import { app } from '../../../app';
import { signIn } from '../../../test/auth-helper';
import { Roles } from '../../../models/user';

it('returns a 401 if the user is not logged in', async () => {
  await request(app).get(`/api/brands`).send().expect(401);
});

it('returns a 401 if the user does not have the proper role', async () => {
  const cookie = signIn({ roles: [] });
  await request(app)
    .get(`/api/brands`)
    .set('Cookie', cookie)
    .send()
    .expect(401);
});

it('returns all sources if it exists for valid user', async () => {
  const cookie = signIn({
    roles: [Roles.VIEW_INVENTORY, Roles.EDIT_INVENTORY],
  });

  await request(app)
    .post('/api/brands')
    .set('Cookie', cookie)
    .send({ name: 'mockBrand1' })
    .expect(201);

  await request(app)
    .post('/api/brands')
    .set('Cookie', cookie)
    .send({ name: 'mockBrand2' })
    .expect(201);

  const response = await request(app)
    .get(`/api/brands`)
    .set('Cookie', cookie)
    .send()
    .expect(200);
  expect(response.body[0].name).toEqual('mockBrand1');
  expect(response.body[1].name).toEqual('mockBrand2');
});
