import { useCallback, useEffect, useRef, useState } from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ViewToken,
  ViewabilityConfigCallbackPairs,
} from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { ITEM_HEIGHT } from '~/presentation/helpers/animations';
import { HomeViewModel } from '~/presentation/viewModels/model';
import {
  Option,
  OptionOfList,
  Product,
} from '../../../presentation/viewModels/model/homeViewModel';
import HomeView from './model';

const viewabilityConfig = {
  waitForInteraction: true,
  viewAreaCoveragePercentThreshold: ITEM_HEIGHT,
};

const useHomeController = ({
  listOfOptions,
  firstOptionList,
  navigate,
}: HomeViewModel): HomeView => {
  const [optionSelected, setOptionSelected] = useState<Option>({
    id: '',
    option: '',
    emptyMessage: '',
  });
  const [selectedOptionItem, setSelectedOptionItem] = useState<Product>({
    productImage: '',
    productName: '',
    productPrice: 0,
    id: '',
    optionId: '',
  });
  const [optionList, setOptionList] = useState<Array<Product>>(firstOptionList);
  const transY = useSharedValue(0);

  const updateSelectedOptionItem = useCallback(
    (productImageViewed: Product) => {
      setSelectedOptionItem(productImageViewed);
    },
    [setSelectedOptionItem],
  );

  const selectOption = useCallback((option: OptionOfList) => {
    if (option) {
      setOptionList(option.list);
      setOptionSelected({
        id: option.id,
        option: option.option,
        emptyMessage: option.emptyMessage,
      });
    }
  }, []);

  useEffect(() => {
    updateSelectedOptionItem(firstOptionList[0]);
    selectOption(listOfOptions[0]);
  }, [firstOptionList, updateSelectedOptionItem, listOfOptions, selectOption]);

  const setSelectedOption = (option: Product) => {
    setSelectedOptionItem(option);
    navigate(option);
  };

  const onViewableItemsChanged = useCallback(
    (info: { changed: ViewToken[] }): void => {
      const changed = info.changed;
      updateSelectedOptionItem({
        productImage: changed[0].item.productImage,
        productName: changed[0].item.productName,
        productPrice: changed[0].item.productPrice,
        id: changed[0].item.id,
        optionId: changed[0].item.optionId,
      });
    },
    [updateSelectedOptionItem],
  );

  const viewabilityConfigCallbackPairs = useRef<ViewabilityConfigCallbackPairs>(
    [{ viewabilityConfig, onViewableItemsChanged }],
  );

  const scrollHandler = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    'worklet';
    transY.value = event.nativeEvent.contentOffset.y;
  };

  return {
    listOfOptions,
    optionList,
    optionSelected,
    selectOption,
    selectedOptionItem,
    setSelectedOption,
    viewabilityConfigCallbackPairs,
    scrollHandler,
    transY,
  };
};

export default useHomeController;
