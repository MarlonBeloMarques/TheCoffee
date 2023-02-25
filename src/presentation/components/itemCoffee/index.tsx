import React from 'react';
import { ImageSourcePropType, TouchableOpacity } from 'react-native';
import { SharedValue, useAnimatedStyle } from 'react-native-reanimated';
import {
  bottomAnimation,
  opacityAnimation,
  scaleAnimation,
} from '~/presentation/helpers/animations';
import { Coffee } from '../../viewModels/model/homeViewModel';
import { AnimatedView, CoffeeImage } from './styles';

type Props = {
  index: number;
  item: Coffee;
  transY: SharedValue<number>;
  onPress: (option: Coffee) => void;
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
          testID={`coffee_image_${item.id}_id`}
          source={item.coffeeImage as ImageSourcePropType}
        />
      </TouchableOpacity>
    </AnimatedView>
  );
};

export default ItemCoffee;
