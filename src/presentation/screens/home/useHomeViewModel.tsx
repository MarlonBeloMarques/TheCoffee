import { useCallback, useEffect, useRef, useState } from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ViewToken,
  ViewabilityConfigCallbackPairs,
} from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { ITEM_HEIGHT } from '~/presentation/helpers/animations';
import HomeViewModel, { Coffee, Option, OptionOfList } from './model';

const viewabilityConfig = {
  waitForInteraction: true,
  viewAreaCoveragePercentThreshold: ITEM_HEIGHT,
};

const useHomeViewModel = (
  listOfOptions: Array<OptionOfList>,
): HomeViewModel => {
  const [optionList, setOptionList] = useState<Array<Coffee>>([]);
  const [optionSelected, setOptionSelected] = useState<Option>({
    id: '',
    option: '',
    emptyMessage: '',
  });
  const [selectedOptionItem, setSelectedOptionItem] = useState<Coffee>({
    coffeeImage: '',
    coffeeName: '',
    coffeePrice: 0,
    id: '',
    optionId: '',
  });

  const transY = useSharedValue(0);

  const updateSelectedOptionItem = useCallback(
    (coffeeImageViewed: Coffee) => {
      setSelectedOptionItem(coffeeImageViewed);
    },
    [setSelectedOptionItem],
  );

  const onViewableItemsChanged = useCallback(
    (info: { changed: ViewToken[] }): void => {
      const changed = info.changed;
      updateSelectedOptionItem({
        coffeeImage: changed[0].item.coffeeImage,
        coffeeName: changed[0].item.coffeeName,
        coffeePrice: changed[0].item.coffeePrice,
        id: changed[0].item.id,
        optionId: changed[0].item.optionId,
      });
    },
    [updateSelectedOptionItem],
  );

  const viewabilityConfigCallbackPairs = useRef<ViewabilityConfigCallbackPairs>(
    [{ viewabilityConfig, onViewableItemsChanged }],
  );

  const selectOption = useCallback(
    (option: OptionOfList) => {
      if (option) {
        setOptionSelected({
          id: option.id,
          option: option.option,
          emptyMessage: option.emptyMessage,
        });
        setOptionList(option.list);
        updateSelectedOptionItem(option.list[0]);
      }
    },
    [updateSelectedOptionItem],
  );

  const setFirstOption = useCallback(
    (firstOption: OptionOfList) => {
      selectOption(firstOption);
    },
    [selectOption],
  );

  const requestStart = useCallback(() => {
    setFirstOption(listOfOptions[0]);
  }, [listOfOptions, setFirstOption]);

  useEffect(() => {
    requestStart();
  }, [requestStart]);

  const scrollHandler = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    'worklet';
    transY.value = event.nativeEvent.contentOffset.y;
  };

  const setSelectedOption = (option: Coffee) => {
    setSelectedOptionItem(option);
  };

  return {
    transY,
    listOfOptions,
    optionList,
    optionSelected,
    scrollHandler,
    selectedOptionItem,
    selectOption,
    viewabilityConfigCallbackPairs,
    setSelectedOption,
  };
};

export default useHomeViewModel;
