import { Dimensions, PlatformOSType } from 'react-native';
import { Extrapolate, SharedValue, interpolate } from 'react-native-reanimated';
import { getOs } from '../utils';

export const getItemHeight = (OS: PlatformOSType) => {
  if (OS === 'ios') {
    return screenHeight / 2.1;
  }

  return screenHeight / 2.4;
};

export const screenHeight = Dimensions.get('screen').height;
export const screenWidth = Dimensions.get('screen').width;
export const ITEM_HEIGHT = getItemHeight(getOs());

export const opacityAnimation = (
  transY: SharedValue<number>,
  index: number,
) => {
  'worklet';

  return interpolate(
    transY.value,
    [(index - 1) * ITEM_HEIGHT, index * ITEM_HEIGHT, (index + 1) * ITEM_HEIGHT],
    [0.6, 1, 0.6],
    Extrapolate.CLAMP,
  );
};

export const scaleAnimation = (transY: SharedValue<number>, index: number) => {
  'worklet';

  return interpolate(
    transY.value,
    [(index - 1) * ITEM_HEIGHT, index * ITEM_HEIGHT, (index + 1) * ITEM_HEIGHT],
    [0.7, 1, 0.7],
    Extrapolate.CLAMP,
  );
};

export const bottomAnimation = (transY: SharedValue<number>, index: number) => {
  'worklet';

  return interpolate(
    transY.value,
    [(index - 1) * ITEM_HEIGHT, index * ITEM_HEIGHT, (index + 1) * ITEM_HEIGHT],
    [-360, 0, -360],
    Extrapolate.CLAMP,
  );
};
