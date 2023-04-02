import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';
import { screenHeight, screenWidth } from '~/presentation/helpers/animations';

export const AnimatedView = styled(Animated.View)``;

type CoffeeImageProps = {
  os: 'ios' | 'android' | 'windows' | 'macos' | 'web';
};

export const CoffeeImage = styled.Image.attrs({
  resizeMode: 'contain',
})<CoffeeImageProps>`
  width: ${screenWidth}px;
  height: ${({ os }) => (os === 'android' ? screenHeight / 2.5 : 400)}px;
`;
