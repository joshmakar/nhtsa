import '../support/setup';
import axios from 'axios';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import nhtsa from '../../src/index';
import decodeVinSuccessJSON from '../mocked-responses/decode-vin/success.json';

chai.use(chaiAsPromised);

describe('#decodeVin()', () => {
  let sandbox: any;
  let response: any;
  let data;
  let vin;

  const validVin = 'WUAAU34248N006164';
  const invalidVin = 'foobar';

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    const resolved = Promise.resolve(decodeVinSuccessJSON);
    sandbox.stub(axios, 'get').returns(resolved);
  });

  afterEach(() => sandbox.restore());

  context('with valid VIN', () => {
    beforeEach(async () => {
      vin = validVin;
      response = await nhtsa.decodeVin(vin);
    });

    it('responds with a 200 status code', () => {
      chai.expect(response.status).to.equal(200);
    });

    it('parses the JSON response', () => {
      chai.expect(typeof response).to.equal('object');
    });

    it('has successful message', () => {
      chai.expect(response.data['Message']).to.equal('Results returned successfully');
    });

    it('has the correct search criteria', () => {
      chai.expect(response.data['SearchCriteria']).to.equal(`VIN:${validVin}`);
    });

    it('has results', () => {
      chai.expect(response.data['Results'].length).to.not.equal(0);
    });
  });

  context('with invalid VIN', () => {
    beforeEach(() => {
      vin = invalidVin;
      response = nhtsa.decodeVin(vin);
    });

    it('responds with an error', () => {
      chai.expect(response).to.be.rejectedWith('Invalid VIN');
    });
  });
});
