import { renderHook } from '@testing-library/react-native';
import { GetListOfOptions } from '~/domain/useCases';
import Option from '../../../src/domain/models/Option';
import useViewModel from '../../../src/presentation/screens/home/viewModel';

describe('ViewModel: Home', () => {
  test('should call get of GetListOfOptions when initialize', () => {
    const getSpy = jest.spyOn(LocalGetListOfOptions.prototype, 'get');
    const getListOfOptions = new LocalGetListOfOptions();
    renderHook(() => useViewModel(getListOfOptions));

    expect(getSpy).toHaveBeenCalledTimes(1);
  });
});

class LocalGetListOfOptions implements GetListOfOptions {
  get(): Promise<Option[]> {
    return [] as unknown as Promise<Array<Option>>;
  }
}
