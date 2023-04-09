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

  test('should update optionList with the same value as the listOfOptions list', async () => {
    const listOfOptions = getListOfOptionsFake();
    const {
      sut: { result },
    } = makeSut(listOfOptions);

    await waitFor(() => {
      expect(result.current.listOfOptions).toEqual(listOfOptions);
    });

    await waitFor(() => {
      result.current.selectOption(listOfOptions[0]);
      expect(result.current.optionList).toEqual(listOfOptions[0].list);
    });
  });

  test('should update optionSelected when call selectOption', async () => {
    const listOfOptions = getListOfOptionsFake();
    const {
      sut: { result },
    } = makeSut(listOfOptions);

    await waitFor(() => {
      result.current.selectOption(listOfOptions[0]);
      expect(result.current.optionSelected).toEqual({
        id: listOfOptions[0].id,
        option: listOfOptions[0].option,
        emptyMessage: listOfOptions[0].emptyMessage,
      });
    });
  });

  test('should to equal optionSelected and first option of listOfOptions', async () => {
    const listOfOptions = getListOfOptionsFake();
    const {
      sut: { result },
    } = makeSut(listOfOptions);

    await waitFor(() => {
      expect(result.current.optionSelected).toEqual({
        id: listOfOptions[0].id,
        option: listOfOptions[0].option,
        emptyMessage: listOfOptions[0].emptyMessage,
      });
    });
  });

  test('should update optionList when initialize', async () => {
    const listOptions = getListOfOptionsFake();
    const { sut } = makeSut(getListOfOptionsFake());

    await waitFor(() => {
      expect(sut.result.current.optionList).toEqual(listOptions[0].list);
    });
  });

  test('should update selectedOptionItem when initialize', async () => {
    const listOptions = getListOfOptionsFake();
    const {
      sut: { result },
    } = makeSut(listOptions);

    await waitFor(() => {
      expect(result.current.listOfOptions).toEqual(listOptions);
    });

    await waitFor(() => {
      expect(result.current.selectedOptionItem).toEqual(listOptions[0].list[0]);
    });
  });

  test('should update selectedOptionItem when call setSelectedOption', async () => {
    const listOptions = getListOfOptionsFake();
    const { sut } = makeSut(getListOfOptionsFake());

    await waitFor(() => {
      sut.result.current.setSelectedOption(listOptions[0].list[1]);
      expect(sut.result.current.selectedOptionItem).toEqual(
        listOptions[0].list[1],
      );
    });
  });

  test('should not update optionSelected if firstOption is undefined', async () => {
    const {
      sut: { result },
    } = makeSut([]);

    await waitFor(() => {
      expect(result.current.listOfOptions).toEqual([]);
    });

    await waitFor(() => {
      expect(result.current.optionSelected).toEqual({
        id: '',
        option: '',
        emptyMessage: '',
      });
    });
  });

  test('should update selectedOptionItem when call updateSelectedOptionItem ', async () => {
    const listOptions = getListOfOptionsFake();
    const {
      sut: { result },
    } = makeSut(listOptions);

    await waitFor(() => {
      expect(result.current.listOfOptions).toEqual(listOptions);
    });

    await waitFor(() => {
      result.current.updateSelectedOptionItem(listOptions[0].list[0]);
      expect(result.current.selectedOptionItem).toEqual(listOptions[0].list[0]);
    });
  });

  test('should navigate to purchase when call setSelectedOption', async () => {
    const listOptions = getListOfOptionsFake();
    const {
      sut: { result },
      navigate,
    } = makeSut(listOptions);

    await waitFor(() => {
      expect(result.current.listOfOptions).toEqual(listOptions);
    });

    await waitFor(() => {
      result.current.setSelectedOption(listOptions[0].list[1]);
      expect(result.current.selectedOptionItem).toEqual(listOptions[0].list[1]);
    });

    expect(navigate.navigateToPurchaseCalled).toEqual(true);
  });

  test('should navigate to purchase with correct param when call setSelectedOption', async () => {
    const listOptions = getListOfOptionsFake();
    const {
      sut: { result },
      navigate,
    } = makeSut(listOptions);

    await waitFor(() => {
      expect(result.current.listOfOptions).toEqual(listOptions);
    });

    await waitFor(() => {
      result.current.setSelectedOption(listOptions[0].list[1]);
      expect(result.current.selectedOptionItem).toEqual(listOptions[0].list[1]);
    });

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
