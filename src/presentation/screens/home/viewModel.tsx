import { useEffect, useState } from 'react';
import { GetListOfOptions } from '~/domain/useCases';
import HomeViewModel, { Coffee, OptionOfList } from './model';

const useViewModel = (getListOfOptions: GetListOfOptions): HomeViewModel => {
  const [listOfOptions, setListOfOptions] = useState<Array<OptionOfList>>([]);
  const [optionList, setOptionList] = useState<Array<Coffee>>([]);

  useEffect(() => {
    requestListOfOptions();
  }, []);

  const requestListOfOptions = async () => {
    const response = await getListOfOptions.get();
    setListOfOptions(response);
  };

  const selectOption = (option: OptionOfList) => {
    setOptionList(option.list);
  };

  return {
    listOfOptions,
    optionList,
    optionSelected: { id: '', option: '' },
    scrollHandler: () => {},
    selectedOptionItem: {
      coffeeImage: '',
      coffeeName: '',
      coffeePrice: 0,
      id: '',
      optionId: '',
    },
    selectOption,
    tryAgain: () => {},
  };
};

export default useViewModel;
