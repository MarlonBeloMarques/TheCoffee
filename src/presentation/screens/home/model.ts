import {
  ImageSourcePropType,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ViewabilityConfigCallbackPairs,
} from 'react-native';
import { SharedValue } from 'react-native-reanimated';

type Coffee = {
  id: string;
  coffeeName: string;
  coffeePrice: number;
  coffeeImage: ImageSourcePropType | string;
  optionId: string;
};

interface Option {
  id: string;
  option: string;
  emptyMessage: string;
}

interface ListOfOption {
  list: Array<Coffee>;
}

type OptionOfList = Option & ListOfOption;

type HomeView = {
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

export default HomeView;
