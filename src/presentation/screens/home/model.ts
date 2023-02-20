import {
  ImageSourcePropType,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ViewabilityConfigCallbackPairs,
} from 'react-native';
import { SharedValue } from 'react-native-reanimated';

export type Coffee = {
  id: string;
  coffeeName: string;
  coffeePrice: number;
  coffeeImage: ImageSourcePropType | string;
  optionId: string;
};

export interface Option {
  id: string;
  option: string;
  emptyMessage: string;
}

interface ListOfOption {
  list: Array<Coffee>;
}

export type OptionOfList = Option & ListOfOption;

type HomeViewModel = {
  listOfOptions: Array<OptionOfList>;
  selectOption: (option: OptionOfList) => void;
  optionSelected: Option;
  selectedOptionItem: Coffee;
  optionList: Array<Coffee>;
  setSelectedOption: (option: Coffee) => void;
  updateSelectedOptionItem: (coffeeImageViewed: Coffee) => void;
};

export type HomeView = {
  transY: SharedValue<number>;
  listOfOptions: Array<OptionOfList>;
  selectOption: (option: OptionOfList) => void;
  optionSelected: Option;
  selectedOptionItem: Coffee;
  optionList: Array<Coffee>;
  scrollHandler: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  setSelectedOption: (option: Coffee) => void;
  viewabilityConfigCallbackPairs: React.MutableRefObject<ViewabilityConfigCallbackPairs>;
};

export default HomeViewModel;
