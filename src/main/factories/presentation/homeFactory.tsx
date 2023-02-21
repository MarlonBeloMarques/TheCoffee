import React from 'react';
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { useAnimatedScrollHandler } from 'react-native-reanimated';
import { RouteProp } from '@react-navigation/native';
import { LocalGetListOfOptions } from '~/data/useCases';
import { Routes } from '~/main/navigation';
import { Home } from '~/presentation/screens';
import useHomeViewModel from '../../../presentation/viewModels/useHomeViewModel';
import useHomeController from '../../../presentation/screens/home/useHomeController';

type Props = {
  route: RouteProp<StackParams, Routes>;
  navigation: any;
};

const HomeFactory: React.FC<Props> = () => {
  const localGetListOfOptions = new LocalGetListOfOptions();
  const viewModel = useHomeViewModel(localGetListOfOptions);
  const homeController = useHomeController(viewModel);

  const scrollHandlerDecorator = useAnimatedScrollHandler({
    onScroll: (event) => {
      homeController.scrollHandler({
        nativeEvent: event,
      } as NativeSyntheticEvent<NativeScrollEvent>);
    },
  });

  return (
    <Home
      listOfOptions={homeController.listOfOptions}
      optionList={homeController.optionList}
      optionSelected={homeController.optionSelected}
      scrollHandler={scrollHandlerDecorator}
      selectOption={homeController.selectOption}
      selectedOptionItem={homeController.selectedOptionItem}
      transY={homeController.transY}
      viewabilityConfigCallbackPairs={
        homeController.viewabilityConfigCallbackPairs
      }
      setSelectedOption={homeController.setSelectedOption}
    />
  );
};

export default HomeFactory;
