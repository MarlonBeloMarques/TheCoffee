import { renderHook, waitFor } from '@testing-library/react-native';
import { LocalGetListOfOptions } from '~/data/useCases';
import { RouteParams } from '~/domain/models';
import { NavigateToPurchase } from '~/domain/useCases';
import { useHomeViewModel } from '~/presentation/viewModels';
import getListOfOptionsFake from '../../ui/fakers/listOfOptionsFake';

afterEach(() => {
  jest.clearAllMocks();
});

describe('ViewModel: Home', () => {
  test('should be the same as the get response than the list of options', async () => {
    const listOfOptions = getListOfOptionsFake();
    const {
      sut: { result },
    } = makeSut(listOfOptions);

    await waitFor(() => {
      expect(result.current.listOfOptions).toEqual(listOfOptions);
    });
  });

  test('should update firstOptionList with the same value as the listOfOptions list', async () => {
    const listOfOptions = getListOfOptionsFake();
    const {
      sut: { result },
    } = makeSut(listOfOptions);

    await waitFor(() => {
      expect(result.current.listOfOptions).toEqual(listOfOptions);
    });

    await waitFor(() => {
      expect(result.current.firstOptionList).toEqual(listOfOptions[0].list);
    });
  });

  test('should navigate to purchase when call navigate', async () => {
    const listOptions = getListOfOptionsFake();
    const {
      sut: { result },
      navigate,
    } = makeSut(listOptions);

    await waitFor(() => {
      expect(result.current.listOfOptions).toEqual(listOptions);
    });

    result.current.navigate(listOptions[0].list[1]);

    expect(navigate.navigateToPurchaseCalled).toEqual(true);
  });

  test('should navigate to purchase with correct param when call navigate', async () => {
    const listOptions = getListOfOptionsFake();
    const {
      sut: { result },
      navigate,
    } = makeSut(listOptions);

    await waitFor(() => {
      expect(result.current.listOfOptions).toEqual(listOptions);
    });

    result.current.navigate(listOptions[0].list[1]);

    expect(navigate.navigateToPurchaseCalled).toEqual(true);
    expect(navigate.navigateToPurchaseParams).toEqual({
      productSelected: JSON.stringify(listOptions[0].list[1]),
    });
  });
});

const makeSut = (listOfOptions = getListOfOptionsFake()) => {
  const navigate = new NavigateSpy();
  jest
    .spyOn(LocalGetListOfOptions.prototype, 'get')
    .mockResolvedValue(listOfOptions);

  const getListOfOptions = new LocalGetListOfOptions();

  const sut = renderHook(() => useHomeViewModel(getListOfOptions, navigate));

  return { sut, navigate };
};

class NavigateSpy implements NavigateToPurchase {
  navigateToPurchaseCalled = false;
  navigateToPurchaseParams: RouteParams | undefined;

  navigate(params?: RouteParams): void {
    this.navigateToPurchaseCalled = true;
    this.navigateToPurchaseParams = params;
  }
}
