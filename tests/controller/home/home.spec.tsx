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
import getSelectedOptionItemStub from '../../ui/stubs/selectedOptionItemStub';
import getOptionSelectedFake from '../../ui/fakers/optionSelectedFake';
import getOptionListFake from '../../ui/fakers/optionListFake';
import getListOfOptionsFake from '../../ui/fakers/listOfOptionsFake';
import useHomeController from '../../../src/presentation/screens/home/usehomeController';
import {
  OptionOfList,
  Product,
} from '../../../src/presentation/viewModels/model/homeViewModel';
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
    let selectedOptionItem = getSelectedOptionItemStub();
    const updateSelectedOptionItem = (productImageViewed: Product) => {
      selectedOptionItem = productImageViewed;
    };
    const listOptions = getListOfOptionsFake();
    const { sut } = makeSut(
      listOptions,
      selectedOptionItem,
      updateSelectedOptionItem,
    );

    onViewableItemsChanged(sut, listOptions);

    expect(selectedOptionItem).toEqual(listOptions[0].list[0]);
  });

  test('should update selectedOptionItem when initialize', async () => {
    const selectedOptionItem = getSelectedOptionItemStub();

    const listOptions = getListOfOptionsFake();
    const { sut } = makeSut(listOptions, selectedOptionItem);

    expect(sut.result.current.selectedOptionItem).toEqual(selectedOptionItem);
  });
});

const makeSut = (
  listOfOptions = getListOfOptionsFake(),
  selectedOptionItem = getSelectedOptionItemStub(),
  updateSelectedOptionItem: (productImageViewed: Product) => void = () => {},
) => {
  const selectOption = jest.fn();

  const sut = renderHook(() =>
    useHomeController({
      listOfOptions,
      optionList: getOptionListFake(),
      optionSelected: getOptionSelectedFake(),
      selectedOptionItem,
      selectOption,
      setSelectedOption: () => {},
      updateSelectedOptionItem,
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
