import { useCallback, useRef } from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ViewToken,
  ViewabilityConfigCallbackPairs,
} from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { ITEM_HEIGHT } from '~/presentation/helpers/animations';
import { HomeViewModel } from '~/presentation/viewModels/model';
import HomeView from './model';

const viewabilityConfig = {
  waitForInteraction: true,
  viewAreaCoveragePercentThreshold: ITEM_HEIGHT,
};

const useHomeController = ({
  listOfOptions,
  optionList,
  optionSelected,
  selectOption,
  selectedOptionItem,
  setSelectedOption,
  updateSelectedOptionItem,
}: HomeViewModel): HomeView => {
  const transY = useSharedValue(0);

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
