import React from 'react';
import { ImageSourcePropType, TouchableOpacity } from 'react-native';
import { SharedValue, useAnimatedStyle } from 'react-native-reanimated';
import {
  bottomAnimation,
  opacityAnimation,
  scaleAnimation,
} from '~/presentation/helpers/animations';
import { getOs } from '~/presentation/helpers/utils';
import { Product } from '../../viewModels/model/homeViewModel';
import { AnimatedView, CoffeeImage } from './styles';

type Props = {
  index: number;
  item: Product;
  transY: SharedValue<number>;
  onPress: (option: Product) => void;
};

const ItemCoffee: React.FC<Props> = ({ index, item, transY, onPress }) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacityAnimation(transY, index),
      bottom: bottomAnimation(transY, index),
      transform: [
        {
          scale: scaleAnimation(transY, index),
        },
      ],
    };
  });
  return (
    <AnimatedView style={animatedStyle}>
      <TouchableOpacity activeOpacity={0.8} onPress={() => onPress(item)}>
        <CoffeeImage
          os={getOs()}
          testID={`product_image_${item.id}_id`}
          source={item.productImage as ImageSourcePropType}
        />
      </TouchableOpacity>
    </AnimatedView>
  );
};

export default ItemCoffee;
