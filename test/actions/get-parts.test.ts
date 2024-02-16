import '../support/setup';
import axios from 'axios';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import nhtsa from '../../src/index';
import getPartsSuccessJSON from '../mocked-responses/get-parts/success.json';

chai.use(chaiAsPromised);

const { expect } = chai;

describe('#getParts()', () => {
  let sandbox: any;
  let response: any;
  const type = 565;
  let toDate: any = new Date();
  let fromDate: any = new Date();

  fromDate.setMonth(toDate.getMonth() - 1);

  toDate = toDate.toLocaleDateString('en-US'); // '3/3/2018';
  fromDate = fromDate.toLocaleDateString('en-US'); // '2/3/2018';

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    const resolved = Promise.resolve(getPartsSuccessJSON);
    sandbox.stub(axios, 'get').returns(resolved);
  });

  beforeEach(async () => {
    response = await nhtsa.getParts(type, toDate, fromDate);
  });

  afterEach(() => sandbox.restore());

  it('responds with a 200 status code', () => {
    expect(response.status).to.equal(200);
  });

  it('parses the JSON response', () => {
    expect(typeof response).to.equal('object');
  });

  it('has successful message', () => {
    expect(response.data['Message']).to.equal('Results returned successfully');
  });

  it('has the correct search criteria', () => {
    expect(response.data['SearchCriteria']).to.equal('Type: 565 | From Date: 2/3/2018 | To Date: 3/3/2018');
  });

  it('has results', () => {
    expect(response.data['Results'].length).to.not.equal(0);
  });
});
