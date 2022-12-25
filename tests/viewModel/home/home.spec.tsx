import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { renderHook, waitFor } from '@testing-library/react-native';
import { GetListOfOptions } from '~/domain/useCases';
import getListOfOptionsFake from '../../ui/fakers/listOfOptionsFake';
import Option from '../../../src/domain/models/Option';
import useViewModel from '../../../src/presentation/screens/home/viewModel';

afterEach(() => {
  jest.clearAllMocks();
});

describe('ViewModel: Home', () => {
  test('should call get of GetListOfOptions when initialize', () => {
    const getSpy = jest.spyOn(LocalGetListOfOptions.prototype, 'get');
    const getListOfOptions = new LocalGetListOfOptions();
    renderHook(() => useViewModel(getListOfOptions));

    expect(getSpy).toHaveBeenCalledTimes(1);
  });

  test('should be the same as the get response than the list of options', async () => {
    const listOfOptions = getListOfOptionsFake();
    jest
      .spyOn(LocalGetListOfOptions.prototype, 'get')
      .mockResolvedValueOnce(listOfOptions);

    const getListOfOptions = new LocalGetListOfOptions();
    const { result } = renderHook(() => useViewModel(getListOfOptions));

    await waitFor(() => {
      expect(result.current.listOfOptions).toEqual(listOfOptions);
    });
  });

  test('should update optionList with the same value as the listOfOptions list', async () => {
    const listOfOptions = getListOfOptionsFake();
    jest
      .spyOn(LocalGetListOfOptions.prototype, 'get')
      .mockResolvedValueOnce(listOfOptions);

    const getListOfOptions = new LocalGetListOfOptions();
    const { result } = renderHook(() => useViewModel(getListOfOptions));

    result.current.selectOption(listOfOptions[0]);

    await waitFor(() => {
      expect(result.current.optionList).toEqual(listOfOptions[0].list);
    });
  });

  test('should update optionSelected when call selectOption', async () => {
    const listOfOptions = getListOfOptionsFake();
    jest
      .spyOn(LocalGetListOfOptions.prototype, 'get')
      .mockResolvedValueOnce(listOfOptions);

    const getListOfOptions = new LocalGetListOfOptions();
    const { result } = renderHook(() => useViewModel(getListOfOptions));

    result.current.selectOption(listOfOptions[0]);

    await waitFor(() => {
      expect(result.current.optionSelected).toEqual({
        id: listOfOptions[0].id,
        option: listOfOptions[0].option,
      });
    });
  });

  test('should to equal optionSelected and first option of listOfOptions', async () => {
    const listOfOptions = getListOfOptionsFake();
    jest
      .spyOn(LocalGetListOfOptions.prototype, 'get')
      .mockResolvedValueOnce(listOfOptions);

    const getListOfOptions = new LocalGetListOfOptions();
    const { result } = renderHook(() => useViewModel(getListOfOptions));

    await waitFor(() => {
      expect(result.current.optionSelected).toEqual({
        id: listOfOptions[0].id,
        option: listOfOptions[0].option,
      });
    });
  });

  test('should update value of transY when call scrollHandler', async () => {
    const listOfOptions = getListOfOptionsFake();
    jest
      .spyOn(LocalGetListOfOptions.prototype, 'get')
      .mockResolvedValueOnce(listOfOptions);

    const getListOfOptions = new LocalGetListOfOptions();
    const { result } = renderHook(() => useViewModel(getListOfOptions));

    result.current.scrollHandler({
      nativeEvent: { contentOffset: { y: 100 } },
    } as NativeSyntheticEvent<NativeScrollEvent>);

    await waitFor(() => {
      expect(result.current.transY).toEqual({ value: 100 });
    });
  });

  test('should call get of GetListOfOptions when call tryAgain', async () => {
    const listOfOptions = getListOfOptionsFake();
    const getSpy = jest
      .spyOn(LocalGetListOfOptions.prototype, 'get')
      .mockRejectedValueOnce(listOfOptions);

    const getListOfOptions = new LocalGetListOfOptions();
    const { result } = renderHook(() => useViewModel(getListOfOptions));

    result.current.tryAgain();

    await waitFor(() => {
      expect(getSpy).toHaveBeenCalledTimes(2);
    });
  });
});

class LocalGetListOfOptions implements GetListOfOptions {
  get(): Promise<Option[]> {
    return Promise.resolve([
      {
        id: '1',
        option: 'Coffee',
        list: [],
      },
      {
        id: '2',
        option: 'Product',
        list: [],
      },
      {
        id: '3',
        option: 'Food',
        list: [],
      },
    ]);
  }
}
