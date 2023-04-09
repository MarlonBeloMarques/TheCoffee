import {
  ImageSourcePropType,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ViewabilityConfigCallbackPairs,
} from 'react-native';
import { SharedValue } from 'react-native-reanimated';

type Product = {
  id: string;
  productName: string;
  productPrice: number;
  productImage: ImageSourcePropType | string;
  optionId: string;
};

interface Option {
  id: string;
  option: string;
  emptyMessage: string;
}

interface ListOfOption {
  list: Array<Product>;
}

type OptionOfList = Option & ListOfOption;

type HomeView = {
  transY: SharedValue<number>;
  listOfOptions: Array<OptionOfList>;
  selectOption: (option: OptionOfList) => void;
  optionSelected: Option;
  selectedOptionItem: Product;
  optionList: Array<Product>;
  scrollHandler: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  setSelectedOption: (option: Product) => void;
  viewabilityConfigCallbackPairs: React.MutableRefObject<ViewabilityConfigCallbackPairs>;
};

export default HomeView;
