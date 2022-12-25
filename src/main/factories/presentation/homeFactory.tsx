import React from 'react';
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { useAnimatedScrollHandler } from 'react-native-reanimated';
import { LocalGetListOfOptions } from '~/data/useCases';
import { Home } from '~/presentation/screens';
import useViewModel from '../../../presentation/screens/home/viewModel';

const HomeFactory: React.FC = () => {
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
    />
  );
};

export default HomeFactory;
