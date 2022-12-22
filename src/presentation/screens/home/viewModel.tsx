import { useEffect } from 'react';
import { GetListOfOptions } from '~/domain/useCases';
import HomeViewModel from './model';

const useViewModel = (getListOfOptions: GetListOfOptions): HomeViewModel => {
  useEffect(() => {
    requestListOfOptions();
  }, []);

  const requestListOfOptions = async () => {
    await getListOfOptions.get();
  };
  return {
    listOfOptions: [],
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
