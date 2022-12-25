import { LocalGetListOfOptions } from '~/data/useCases';
import { makeListOfOptions } from '../../../src/data/useCases/localGetListOfOptions';

describe('Data: LocalGetListOfOptions', () => {
  test('should get the list of options returning the values with success', async () => {
    const sut = new LocalGetListOfOptions();
    const response = await sut.get();
    expect(response).toEqual(makeListOfOptions());
  });
});
