import {Client} from '@loopback/testlab';
import {ApiApplication} from '../..';
import {setupApplication} from './test-helper';

describe('UserController', () => {
  let app: ApiApplication;
  let client: Client;

  before('setupApplication', async () => {
    ({app, client} = await setupApplication());
  });

  after(async () => {
    await app.stop();
  });

  it('invokes POST /users', async () => {
    await client
      .post('/users')
      .type('application/json')
      .send('{"password": "test", "email": "zanoski.marko@gmail.com", "username": "Zanoshky"}')
      .expect(200);
  });
});
