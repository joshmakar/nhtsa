import nhtsa from '../src';

test('adds two numbers correctly', () => {
  const result = nhtsa.URL_BASE;
  expect(result).toBe('https://vpic.nhtsa.dot.gov/api/vehicles');

  const response = nhtsa.decodeVin('1M8GDM9AXKP042788');

  expect(response).toBeInstanceOf(Promise);

  response.then((res: any) => {
    expect(res).toBeDefined();
  });
});
