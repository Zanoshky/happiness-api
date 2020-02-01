import {Client} from '@loopback/testlab';
import {ApiApplication} from '../..';
import {setupApplication} from './test-helper';

describe('StatusController', () => {
  let app: ApiApplication;
  let client: Client;

  before('setupApplication', async () => {
    ({app, client} = await setupApplication());
  });

  after(async () => {
    await app.stop();
  });

  it('invokes GET /measurements/{homebaseId}/{humidity}/{temperature}/{dust}/{gas}/{pressure}/{volume}/{light}', async () => {
    await client
      .get('/measurements/1/2/3/4/5/6/7/8')
      .type('application/json')
      .expect(200);
  });

  it('invokes GET /status/1', async () => {
    await client
      .get('/status/1')
      .type('application/json')
      .expect(200);
  });
});
