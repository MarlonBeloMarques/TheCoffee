import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';
import { screenWidth } from '~/presentation/helpers/animations';

export const AnimatedView = styled(Animated.View)``;

export const CoffeeImage = styled.Image.attrs({
  resizeMode: 'contain',
})`
  width: ${screenWidth}px;
  height: 400px;
`;
