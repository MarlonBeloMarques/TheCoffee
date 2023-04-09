import { useCallback, useEffect, useState } from 'react';
import { GetListOfOptions, NavigateToPurchase } from '~/domain/useCases';
import { HomeViewModel } from './model';
import { Option, OptionOfList, Product } from './model/homeViewModel';

const useHomeViewModel = (
  getListOfOptions: GetListOfOptions,
  navigateToPurchase: NavigateToPurchase,
): HomeViewModel => {
  const [listOfOptions, setListOfOptions] = useState<Array<OptionOfList>>([]);
  const [optionList, setOptionList] = useState<Array<Product>>([]);
  const [optionSelected, setOptionSelected] = useState<Option>({
    id: '',
    option: '',
    emptyMessage: '',
  });
  const [selectedOptionItem, setSelectedOptionItem] = useState<Product>({
    productImage: '',
    productName: '',
    productPrice: 0,
    id: '',
    optionId: '',
  });

  useEffect(() => {
    requestStart();
  }, []);

  const requestStart = async () => {
    const response = await requestListOfOptions();
    setListOfOptions(response);
    setFirstOption(response[0]);
    updateSelectedOptionItem(response[0].list[0]);
  };

  const requestListOfOptions = async () => {
    return await getListOfOptions.get();
  };

  const selectOption = useCallback((option: OptionOfList) => {
    if (option) {
      setOptionList(option.list);
      setOptionSelected({
        id: option.id,
        option: option.option,
        emptyMessage: option.emptyMessage,
      });
    }
  }, []);

  const setFirstOption = useCallback(
    (firstOption: OptionOfList) => {
      selectOption(firstOption);
    },
    [selectOption],
  );

  const setSelectedOption = (option: Product) => {
    setSelectedOptionItem(option);
    navigateToPurchase.navigate({ productSelected: JSON.stringify(option) });
  };

  const updateSelectedOptionItem = useCallback(
    (productImageViewed: Product) => {
      setSelectedOptionItem(productImageViewed);
    },
    [setSelectedOptionItem],
  );

  return {
    listOfOptions,
    selectOption,
    optionSelected,
    selectedOptionItem,
    optionList,
    setSelectedOption,
    updateSelectedOptionItem,
  };
};

export default useHomeViewModel;
