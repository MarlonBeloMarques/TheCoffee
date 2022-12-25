import { useEffect, useState } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { GetListOfOptions } from '~/domain/useCases';
import HomeViewModel, { Coffee, Option, OptionOfList } from './model';

const useViewModel = (getListOfOptions: GetListOfOptions): HomeViewModel => {
  const [listOfOptions, setListOfOptions] = useState<Array<OptionOfList>>([]);
  const [optionList, setOptionList] = useState<Array<Coffee>>([]);
  const [optionSelected, setOptionSelected] = useState<Option>({
    id: '',
    option: '',
  });

  const transY = useSharedValue(0);

  useEffect(() => {
    requestStart();
  }, []);

  const requestStart = async () => {
    const response = await requestListOfOptions();
    setFirstOption({ id: response[0].id, option: response[0].option });
  };

  const requestListOfOptions = async () => {
    const response = await getListOfOptions.get();
    setListOfOptions(response);

    return response;
  };

  const setFirstOption = (firstOption: Option) => {
    setOptionSelected(firstOption);
  };

  const selectOption = (option: OptionOfList) => {
    setOptionSelected({ id: option.id, option: option.option });
    setOptionList(option.list);
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
    selectedOptionItem: {
      coffeeImage: '',
      coffeeName: '',
      coffeePrice: 0,
      id: '',
      optionId: '',
    },
    selectOption,
    tryAgain,
  };
};

export default useViewModel;
