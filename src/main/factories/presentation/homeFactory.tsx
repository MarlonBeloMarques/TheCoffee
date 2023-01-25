import React from 'react';
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { useAnimatedScrollHandler } from 'react-native-reanimated';
import { RouteProp } from '@react-navigation/native';
import { LocalGetListOfOptions } from '~/data/useCases';
import { Routes } from '~/main/navigation';
import { Home } from '~/presentation/screens';
import useViewModel from '../../../presentation/screens/home/viewModel';

type Props = {
  route: RouteProp<StackParams, Routes>;
  navigation: any;
};

const HomeFactory: React.FC<Props> = () => {
  const localGetListOfOptions = new LocalGetListOfOptions();
  const viewModel = useViewModel(localGetListOfOptions);

  const scrollHandlerDecorator = useAnimatedScrollHandler({
    onScroll: (event) => {
      viewModel.scrollHandler({
        nativeEvent: event,
      } as NativeSyntheticEvent<NativeScrollEvent>);
    },
  });

  return (
    <Home
      listOfOptions={viewModel.listOfOptions}
      optionList={viewModel.optionList}
      optionSelected={viewModel.optionSelected}
      scrollHandler={scrollHandlerDecorator}
      selectOption={viewModel.selectOption}
      selectedOptionItem={viewModel.selectedOptionItem}
      transY={viewModel.transY}
      tryAgain={viewModel.tryAgain}
      viewabilityConfigCallbackPairs={viewModel.viewabilityConfigCallbackPairs}
      setSelectedOption={viewModel.setSelectedOption}
    />
  );
};

export default HomeFactory;
