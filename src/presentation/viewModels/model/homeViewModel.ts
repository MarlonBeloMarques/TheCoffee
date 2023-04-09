import { ImageSourcePropType } from 'react-native';

export type Product = {
  id: string;
  productName: string;
  productPrice: number;
  productImage: ImageSourcePropType | string;
  optionId: string;
};

export interface Option {
  id: string;
  option: string;
  emptyMessage: string;
}

interface ListOfOption {
  list: Array<Product>;
}

export type OptionOfList = Option & ListOfOption;

type HomeViewModel = {
  listOfOptions: Array<OptionOfList>;
  selectOption: (option: OptionOfList) => void;
  optionSelected: Option;
  selectedOptionItem: Product;
  optionList: Array<Product>;
  setSelectedOption: (option: Product) => void;
  updateSelectedOptionItem: (productImageViewed: Product) => void;
};

export default HomeViewModel;
