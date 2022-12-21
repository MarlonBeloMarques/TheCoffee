import React from 'react';
import { ImageSourcePropType } from 'react-native';
import { SharedValue, useAnimatedStyle } from 'react-native-reanimated';
import {
  bottomAnimation,
  opacityAnimation,
  scaleAnimation,
} from '~/presentation/helpers/animations';
import { Coffee } from '../../screens/home/model';
import { AnimatedView, CoffeeImage } from './styles';

type Props = {
  index: number;
  item: Coffee;
  transY: SharedValue<number>;
};

const ItemCoffee: React.FC<Props> = ({ index, item, transY }) => {
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
      <CoffeeImage
        testID={`coffee_image_${item.id}_id`}
        source={item.coffeeImage as ImageSourcePropType}
      ></CoffeeImage>
    </AnimatedView>
  );
};

export default ItemCoffee;
