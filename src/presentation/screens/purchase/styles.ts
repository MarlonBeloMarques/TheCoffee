import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dimensions } from 'react-native';
import { colors } from '~/presentation/themes';
export const screenHeight = Dimensions.get('screen').height;

export const Wrapper = styled.View``;

export const WrapperScreen = styled.View`
  flex: 1;
  margin: 0 16px;
  margin-top: 16px;
`;

export const CoffeeName = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 9px;
`;

export const CoffeePrice = styled.Text`
  font-size: 20px;
`;

export const CoffeeImage = styled.Image.attrs({
  resizeMode: 'contain',
})`
  width: 340px;
  height: ${screenHeight / 2.6}px;
`;

export const PaymentWrapper = styled.View`
  flex-direction: row;
  margin-bottom: 30px;
`;

export const PaymentDescription = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

export const CreditCardWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const CreditCardNumber = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

export const CreditCardIcon = styled(Icon).attrs({
  name: 'credit-card',
  size: 16,
})``;

export const ConfirmPurchaseButton = styled.TouchableOpacity`
  height: 53px;
  background-color: ${colors.primary};
  border-radius: 16px;
  justify-content: center;
  align-items: center;
`;

export const ConfirmPurchaseButtonDescription = styled.Text`
  color: ${colors.secondary};
  font-weight: bold;
`;
