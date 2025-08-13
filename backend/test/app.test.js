const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');

chai.use(chaiHttp);
const { expect } = chai;

describe('Health endpoint', () => {
  it('GET /api/health should return ok', async () => {
    const res = await chai.request(app).get('/api/health');
    expect(res).to.have.status(200);
    expect(res.body).to.deep.equal({ status: 'ok' });
  });
});


