import { useCallback, useEffect, useRef, useState } from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ViewToken,
  ViewabilityConfigCallbackPairs,
} from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { GetListOfOptions } from '~/domain/useCases';
import { ITEM_HEIGHT } from '~/presentation/helpers/animations';
import HomeViewModel, { Coffee, Option, OptionOfList } from './model';

const viewabilityConfig = {
  waitForInteraction: true,
  viewAreaCoveragePercentThreshold: ITEM_HEIGHT,
};

const useViewModel = (getListOfOptions: GetListOfOptions): HomeViewModel => {
  const [listOfOptions, setListOfOptions] = useState<Array<OptionOfList>>([]);
  const [optionList, setOptionList] = useState<Array<Coffee>>([]);
  const [optionSelected, setOptionSelected] = useState<Option>({
    id: '',
    option: '',
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

  useEffect(() => {
    requestStart();
  }, []);

  const requestStart = async () => {
    const response = await requestListOfOptions();
    setFirstOption(response[0]);
  };

  const requestListOfOptions = async () => {
    const response = await getListOfOptions.get();
    setListOfOptions(response);

    return response;
  };

  const setFirstOption = (firstOption: OptionOfList) => {
    selectOption(firstOption);
  };

  const selectOption = (option: OptionOfList) => {
    setOptionSelected({ id: option.id, option: option.option });
    setOptionList(option.list);
    updateSelectedOptionItem(option.list[0]);
  };

  const scrollHandler = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    'worklet';
    transY.value = event.nativeEvent.contentOffset.y;
  };

  const tryAgain = () => {
    requestStart();
  };

  return {
    transY,
    listOfOptions,
    optionList,
    optionSelected,
    scrollHandler,
    selectedOptionItem,
    selectOption,
    tryAgain,
    viewabilityConfigCallbackPairs,
  };
};

export default useViewModel;
