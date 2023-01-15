import { FlatList } from 'react-native';
import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';
import { screenWidth } from '~/presentation/helpers/animations';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export const Wrapper = styled.View``;

export const OptionWrapper = styled.View`
  margin: 0 8px 0 8px;
  justify-content: center;
  align-items: center;
`;

export const CoffeesImagesEmptyWrapper = styled.View`
  justify-content: center;
  align-items: center;
  margin: 0 60px 0 60px;
`;

export const EmptyMessageCoffeesImages = styled.Text`
  font-size: 20px;
  font-weight: bold;
  line-height: 23px;
  text-align: center;
  margin-bottom: 12px;
`;
export const TryAgainMessage = styled.Text`
  font-size: 16px;
  line-height: 18px;
`;

export const TryAgainButton = styled.TouchableWithoutFeedback``;

export const CoffeesImagesWrapper = styled.View`
  height: 70%;
  justify-content: center;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const Option = styled.Text`
  font-size: 16px;
  line-height: 18px;
`;

export const UnderlineOfOption = styled.View`
  bottom: -6px;
  position: absolute;
  width: 100%;
  height: 2px;
  background-color: #000000;
`;

export const CoffeeName = styled.Text`
  font-size: 24px;
  font-weight: bold;
  line-height: 27px;
  margin-bottom: 9px;
  text-align: center;
`;

export const CoffeePrice = styled.Text`
  font-size: 20px;
  line-height: 23px;
  text-align: center;
`;

export const CoffeeDetailsWrapper = styled.View`
  position: absolute;
  z-index: 1;
  align-self: center;
  margin-top: 100px;
`;

export const ListOfOptions = styled.ScrollView.attrs({
  horizontal: true,
  contentContainerStyle: { alignItems: 'center' },
})`
  width: ${screenWidth}px;
  height: 22px;
`;

export const OptionButton = styled.TouchableOpacity``;

export const CoffeesImagesList = styled(AnimatedFlatList).attrs({
  showsVerticalScrollIndicator: false,
  decelerationRate: 'fast',
  snapToAlignment: 'center',
  centerContent: true,
  scrollEventThrottle: 16,

  pagingEnabled: true,
})``;
