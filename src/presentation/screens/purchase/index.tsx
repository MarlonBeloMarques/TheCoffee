import React from 'react';
import {
  Image,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Coffee } from '../../../presentation/viewModels/model/homeViewModel';

type PurchaseProps = {
  coffeeSelected: Coffee;
  paymentDetail: {
    creditCard: {
      number: string;
    };
  };
  confirmPurchase: () => void;
};

const Purchase: React.FC<PurchaseProps> = ({
  coffeeSelected,
  paymentDetail,
  confirmPurchase,
}) => {
  return (
    <View>
      <View>
        <Text testID="coffee_name_id">{coffeeSelected.coffeeName}</Text>
        <Text testID="coffee_price_id">{`R$ ${coffeeSelected.coffeePrice.toFixed(
          2,
        )}`}</Text>
      </View>
      <View>
        <Image
          testID="coffee_image_id"
          source={coffeeSelected.coffeeImage as ImageSourcePropType}
        />
      </View>
      <View>
        <Text testID="payment_description_id">{'Pay with credit card:'}</Text>
        <View>
          <Text testID="payment_number_credit_card_id">
            {paymentDetail.creditCard.number}
          </Text>
          <Icon testID="payment_icon_credit_card_id" name="credit_card" />
        </View>
      </View>
      <TouchableOpacity
        testID="confirm_purchase_button_id"
        onPress={confirmPurchase}
      >
        <Text>{'Confirm purchase'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Purchase;
