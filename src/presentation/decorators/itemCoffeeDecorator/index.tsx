import React from 'react';
import { View } from 'react-native';
import { SharedValue } from 'react-native-reanimated';
import { ItemCoffee } from '~/presentation/components';
import { getOs } from '~/presentation/helpers/utils';
import { Product } from '../../../presentation/viewModels/model/homeViewModel';

type Props = {
  item: Product;
  index: number;
  optionList: Array<Product>;
  transY: SharedValue<number>;
  setSelectedOption: (option: Product) => void;
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
      testID={`product_image_wrapper_${index}_id`}
      style={{
        marginBottom:
          lastPosition === index ? (getOs() === 'ios' ? 26 : 40) : 0,
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
