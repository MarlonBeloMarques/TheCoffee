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
  firstOptionList: Array<Product>;
  navigate: (option: Product) => void;
};

export default HomeViewModel;
