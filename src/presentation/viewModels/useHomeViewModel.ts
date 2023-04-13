import { useEffect, useState } from 'react';
import { GetListOfOptions, NavigateToPurchase } from '~/domain/useCases';
import { HomeViewModel } from './model';
import { OptionOfList, Product } from './model/homeViewModel';

const useHomeViewModel = (
  getListOfOptions: GetListOfOptions,
  navigateToPurchase: NavigateToPurchase,
): HomeViewModel => {
  const [listOfOptions, setListOfOptions] = useState<Array<OptionOfList>>([]);
  const [firstOptionList, setFirstOptionList] = useState<Array<Product>>([]);

  useEffect(() => {
    requestStart();
  }, []);

  const requestStart = async () => {
    const response = await requestListOfOptions();
    setListOfOptions(response);
    setFirstOption(response[0]);
  };

  const requestListOfOptions = async () => {
    return await getListOfOptions.get();
  };

  const setFirstOption = (firstOption: OptionOfList) => {
    setFirstOptionList(firstOption.list);
  };

  const navigate = (option: Product) => {
    navigateToPurchase.navigate({ productSelected: JSON.stringify(option) });
  };

  return {
    listOfOptions,
    firstOptionList,
    navigate,
  };
};

export default useHomeViewModel;
