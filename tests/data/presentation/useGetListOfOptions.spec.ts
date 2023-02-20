import { renderHook, waitFor } from '@testing-library/react-native';
import { LocalGetListOfOptions } from '~/data/useCases';
import useGetListOfOptions from '../../../src/presentation/screens/home/useGetListOfOptions';
import getListOfOptionsFake from '../../ui/fakers/listOfOptionsFake';

describe('Contexts: useGetListOfOptions', () => {
  test('should get listOfOptions with success', async () => {
    jest
      .spyOn(LocalGetListOfOptions.prototype, 'get')
      .mockResolvedValue(getListOfOptionsFake());

    const getListOfOptions = new LocalGetListOfOptions();

    const { result } = renderHook(() => useGetListOfOptions(getListOfOptions));

    await waitFor(() => {
      expect(result.current.listOfOptions).toEqual(getListOfOptionsFake());
    });
  });
});
