import { useEffect, useState } from 'react';
import { OptionOfList } from 'src/presentation/screens/home/model';
import { renderHook, waitFor } from '@testing-library/react-native';
import { GetListOfOptions } from '~/domain/useCases';
import { LocalGetListOfOptions } from '~/data/useCases';
import getListOfOptionsFake from '../ui/fakers/listOfOptionsFake';

describe('Contexts: GetListOfOptionsContext', () => {
  test('should get listOfOptions with success', async () => {
    jest
      .spyOn(LocalGetListOfOptions.prototype, 'get')
      .mockResolvedValue(getListOfOptionsFake());

    const getListOfOptions = new LocalGetListOfOptions();

    const { result } = renderHook(() =>
      useGetListOfOptionsContext(getListOfOptions),
    );

    await waitFor(() => {
      expect(result.current.listOfOptions).toEqual(getListOfOptionsFake());
    });
  });
});

const useGetListOfOptionsContext = (
  getListOfOptions: GetListOfOptions,
): {
  listOfOptions: Array<OptionOfList>;
} => {
  const [listOfOptions, setListOfOptions] = useState<Array<OptionOfList>>([]);

  useEffect(() => {
    requestStart();
  }, []);

  const requestStart = async () => {
    const response = await requestListOfOptions();
    setListOfOptions(response);
  };

  const requestListOfOptions = async () => {
    const response = await getListOfOptions.get();
    setListOfOptions(response);

    return response;
  };

  return { listOfOptions };
};
