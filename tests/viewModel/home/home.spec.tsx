import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ViewToken,
} from 'react-native';
import HomeViewModel, {
  OptionOfList,
} from 'src/presentation/screens/home/model';
import {
  RenderHookResult,
  renderHook,
  waitFor,
} from '@testing-library/react-native';
import { LocalGetListOfOptions } from '~/data/useCases';
import getListOfOptionsFake from '../../ui/fakers/listOfOptionsFake';
import useViewModel from '../../../src/presentation/screens/home/viewModel';

afterEach(() => {
  jest.clearAllMocks();
});

describe('ViewModel: Home', () => {
  test('should call get of GetListOfOptions when initialize', () => {
    const { getSpy } = makeSut();

    expect(getSpy).toHaveBeenCalledTimes(1);
  });

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

    result.current.selectOption(listOfOptions[0]);

    await waitFor(() => {
      expect(result.current.optionList).toEqual(listOfOptions[0].list);
    });
  });

  test('should update optionSelected when call selectOption', async () => {
    const listOfOptions = getListOfOptionsFake();
    const {
      sut: { result },
    } = makeSut(listOfOptions);
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
    const {
      sut: { result },
    } = makeSut(listOfOptions);

    await waitFor(() => {
      expect(result.current.optionSelected).toEqual({
        id: listOfOptions[0].id,
        option: listOfOptions[0].option,
      });
    });
  });

  test('should update value of transY when call scrollHandler', async () => {
    const {
      sut: { result },
    } = makeSut();

    result.current.tryAgain();

    result.current.scrollHandler({
      nativeEvent: { contentOffset: { y: 100 } },
    } as NativeSyntheticEvent<NativeScrollEvent>);

    await waitFor(() => {
      expect(result.current.transY).toEqual({ value: 100 });
    });
  });

  test('should call get of GetListOfOptions when call tryAgain', async () => {
    const {
      sut: { result },
      getSpy,
    } = makeSut();

    result.current.tryAgain();

    await waitFor(() => {
      expect(getSpy).toHaveBeenCalledTimes(2);
    });
  });

  test('should update optionList when initialize', async () => {
    const listOptions = getListOfOptionsFake();
    const { sut } = makeSut(getListOfOptionsFake());

    await waitFor(() => {
      expect(sut.result.current.optionList).toEqual(listOptions[0].list);
    });
  });

  test('should update selectedOptionItem when called onViewableItemsChanged of viewabilityConfigCallbackPairs', async () => {
    const listOptions = getListOfOptionsFake();
    const { sut } = makeSut(getListOfOptionsFake());

    onViewableItemsChanged(sut, listOptions);

    await waitFor(() => {
      expect(sut.result.current.selectedOptionItem).toEqual(
        listOptions[0].list[0],
      );
    });
  });

  test('should update selectedOptionItem when initialize', async () => {
    const listOptions = getListOfOptionsFake();
    const { sut } = makeSut(getListOfOptionsFake());

    await waitFor(() => {
      expect(sut.result.current.selectedOptionItem).toEqual(
        listOptions[0].list[0],
      );
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
});

const makeSut = (listOfOptions = getListOfOptionsFake()) => {
  const getSpy = jest
    .spyOn(LocalGetListOfOptions.prototype, 'get')
    .mockResolvedValueOnce(listOfOptions);

  const getListOfOptions = new LocalGetListOfOptions();
  const sut = renderHook(() => useViewModel(getListOfOptions));

  return { sut, getSpy };
};

const onViewableItemsChanged = (
  sut: RenderHookResult<HomeViewModel, unknown>,
  listOptions: Array<OptionOfList>,
) => {
  if (
    sut.result.current.viewabilityConfigCallbackPairs.current[0]
      .onViewableItemsChanged
  ) {
    sut.result.current.viewabilityConfigCallbackPairs.current[0].onViewableItemsChanged(
      {
        changed: [
          {
            item: {
              coffeeImage: listOptions[0].list[0].coffeeImage,
              coffeeName: listOptions[0].list[0].coffeeName,
              coffeePrice: listOptions[0].list[0].coffeePrice,
              id: listOptions[0].list[0].id,
              optionId: listOptions[0].list[0].optionId,
            },
          },
        ] as ViewToken[],
        viewableItems: [],
      },
    );
  }
};
