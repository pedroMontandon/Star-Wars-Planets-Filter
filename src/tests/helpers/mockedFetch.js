import mockedPlanets from './mockedPlanets';

const mockedFetch = () => Promise.resolve({
  status: 200,
  ok: true,
  json: () => Promise.resolve(mockedPlanets),
});

export default mockedFetch;
