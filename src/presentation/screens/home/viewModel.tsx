import { useEffect, useState } from 'react';
import { GetListOfOptions } from '~/domain/useCases';
import HomeViewModel, { OptionOfList } from './model';

const useViewModel = (getListOfOptions: GetListOfOptions): HomeViewModel => {
  const [listOfOptions, setListOfOptions] = useState<Array<OptionOfList>>([]);

  useEffect(() => {
    requestListOfOptions();
  }, []);

  const requestListOfOptions = async () => {
    const response = await getListOfOptions.get();
    setListOfOptions(response);
  };
  return {
    listOfOptions,
    optionList: [],
    optionSelected: { id: '', option: '' },
    scrollHandler: () => {},
    selectedOptionItem: {
      coffeeImage: '',
      coffeeName: '',
      coffeePrice: 0,
      id: '',
      optionId: '',
    },
    selectOption: () => {},
    tryAgain: () => {},
  };
};

export default useViewModel;
