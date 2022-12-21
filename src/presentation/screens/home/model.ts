import {
  ImageSourcePropType,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';

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
  listOfOptions: Array<OptionOfList>;
  selectOption: (option: Option) => void;
  optionSelected: Option;
  selectedOptionItem: Coffee;
  optionList: Array<Coffee>;
  tryAgain: () => void;
  scrollHandler:
    | ((event: NativeSyntheticEvent<NativeScrollEvent>) => void)
    | undefined;
};

export default HomeViewModel;
