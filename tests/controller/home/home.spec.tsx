import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ViewToken,
} from 'react-native';
import {
  RenderHookResult,
  renderHook,
  waitFor,
} from '@testing-library/react-native';
import useHomeController from '../../../src/presentation/screens/home/useHomeController';
import getOptionListFake from '../../ui/fakers/optionListFake';
import getListOfOptionsFake from '../../ui/fakers/listOfOptionsFake';
import { OptionOfList } from '../../../src/presentation/viewModels/model/homeViewModel';
import HomeView from '../../../src/presentation/screens/home/model';

describe('Controller: Home', () => {
  test('should update value of transY when call scrollHandler', async () => {
    const {
      sut: { result },
    } = makeSut();

    result.current.scrollHandler({
      nativeEvent: { contentOffset: { y: 100 } },
    } as NativeSyntheticEvent<NativeScrollEvent>);

    await waitFor(() => {
      expect(result.current.transY).toEqual({ value: 100 });
    });
  });

  test('should update selectedOptionItem when called onViewableItemsChanged of viewabilityConfigCallbackPairs', async () => {
    const listOptions = getListOfOptionsFake();
    const firstOptionList = getOptionListFake();
    const { sut } = makeSut(listOptions, firstOptionList);

    await waitFor(() => {
      onViewableItemsChanged(sut, listOptions);
      expect(sut.result.current.selectedOptionItem).toEqual(
        listOptions[0].list[0],
      );
    });
  });

  test('should update selectedOptionItem when initialize', async () => {
    const listOptions = getListOfOptionsFake();
    const firstOptionList = getOptionListFake();

    const { sut } = makeSut(listOptions, firstOptionList);

    await waitFor(() => {
      expect(sut.result.current.selectedOptionItem).toEqual(firstOptionList[0]);
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

  test('should navigate to purchase with correct param when call setSelectedOption', async () => {
    const listOptions = getListOfOptionsFake();
    const navigateSpy = jest.fn();
    const {
      sut: { result },
    } = makeSut(listOptions, getOptionListFake(), navigateSpy);

    await waitFor(() => {
      expect(result.current.listOfOptions).toEqual(listOptions);
    });

    await waitFor(() => {
      result.current.setSelectedOption(listOptions[0].list[1]);
      expect(result.current.selectedOptionItem).toEqual(listOptions[0].list[1]);
    });

    expect(navigateSpy).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith(listOptions[0].list[1]);
  });

  test('should navigate to purchase when call setSelectedOption', async () => {
    const listOptions = getListOfOptionsFake();
    const navigateSpy = jest.fn();
    const {
      sut: { result },
    } = makeSut(listOptions, getOptionListFake(), navigateSpy);

    await waitFor(() => {
      expect(result.current.listOfOptions).toEqual(listOptions);
    });

    await waitFor(() => {
      result.current.setSelectedOption(listOptions[0].list[1]);
      expect(result.current.selectedOptionItem).toEqual(listOptions[0].list[1]);
    });

    expect(navigateSpy).toHaveBeenCalled();
  });
});

const makeSut = (
  listOfOptions = getListOfOptionsFake(),
  firstOptionList = getOptionListFake(),
  navigate = () => {},
) => {
  const sut = renderHook(() =>
    useHomeController({
      firstOptionList,
      listOfOptions,
      navigate,
    }),
  );

  return { sut };
};

const onViewableItemsChanged = (
  sut: RenderHookResult<HomeView, unknown>,
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
              productImage: listOptions[0].list[0].productImage,
              productName: listOptions[0].list[0].productName,
              productPrice: listOptions[0].list[0].productPrice,
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
