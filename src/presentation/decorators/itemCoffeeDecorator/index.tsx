import React from 'react';
import { View } from 'react-native';
import { SharedValue } from 'react-native-reanimated';
import { ItemCoffee } from '~/presentation/components';
import { Coffee } from '../../../presentation/viewModels/model/homeViewModel';

type Props = {
  item: Coffee;
  index: number;
  optionList: Array<Coffee>;
  transY: SharedValue<number>;
  setSelectedOption: (option: Coffee) => void;
};

const ItemCoffeeDecorator: React.FC<Props> = ({
  item,
  index,
  optionList,
  transY,
  setSelectedOption,
}) => {
  const lastPosition = optionList.length - 1;
  return (
    <View
      testID={`coffee_image_wrapper_${index}_id`}
      style={{
        marginBottom: lastPosition === index ? 26 : 0,
        marginTop: index === 0 ? 26 : 0,
      }}
    >
      <ItemCoffee
        index={index}
        item={item}
        transY={transY}
        onPress={setSelectedOption}
      />
    </View>
  );
};

export default ItemCoffeeDecorator;
