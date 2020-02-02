import {Client} from '@loopback/testlab';
import {ApiApplication} from '../..';
import {setupApplication} from './test-helper';

const pjson = require('../../../package.json');

describe('HomePage', () => {
  let app: ApiApplication;
  let client: Client;

  before('setupApplication', async () => {
    ({app, client} = await setupApplication());
  });

  after(async () => {
    await app.stop();
  });

  it('exposes a default home page', async () => {
    await client
      .get('/')
      .expect(200)
      .expect('Content-Type', /text\/html/);
  });

  it('exposes self-hosted explorer', async () => {
    await client
      .get('/explorer/')
      .expect(200)
      .expect('Content-Type', /text\/html/)
      .expect(/<title>LoopBack API Explorer/);
  });

  it('contins correct build version', async () => {
    await client
      .get('/')
      .expect(200)
      .expect(new RegExp(pjson.version, 'gi'));
  });
});
