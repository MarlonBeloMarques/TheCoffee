import {
  ImageSourcePropType,
  NativeScrollEvent,
  NativeSyntheticEvent,
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
}

interface ListOfOption {
  list: Array<Coffee>;
}

export type OptionOfList = Option & ListOfOption;

type HomeViewModel = {
  transY: SharedValue<number>;
  listOfOptions: Array<OptionOfList>;
  selectOption: (option: OptionOfList) => void;
  optionSelected: Option;
  selectedOptionItem: Coffee;
  optionList: Array<Coffee>;
  tryAgain: () => void;
  scrollHandler: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  setCoffeeImageViewed: (coffeeImageViewed: OptionOfList) => void;
};

export default HomeViewModel;
