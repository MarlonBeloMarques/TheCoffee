import React from 'react';
import {
  Image,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors } from '~/presentation/themes';
import { Coffee } from '../../../presentation/viewModels/model/homeViewModel';

export type PurchaseProps = {
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
    <View style={{ marginHorizontal: 16, marginTop: 16, flex: 1 }}>
      <View>
        <Text
          style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 9 }}
          testID="coffee_name_id"
        >
          {coffeeSelected.coffeeName}
        </Text>
        <Text
          style={{ fontSize: 20 }}
          testID="coffee_price_id"
        >{`R$ ${coffeeSelected.coffeePrice.toFixed(2)}`}</Text>
      </View>
      <View style={{ flex: 0.8 }}>
        <Image
          resizeMode="contain"
          testID="coffee_image_id"
          source={coffeeSelected.coffeeImage as ImageSourcePropType}
          style={{
            width: 340,
            height: 460,
          }}
        />
      </View>
      <View style={{ flexDirection: 'row', marginBottom: 30 }}>
        <Text
          style={{ fontSize: 16, fontWeight: 'bold' }}
          testID="payment_description_id"
        >
          {'Pay with credit card: '}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text
            style={{ fontSize: 16, fontWeight: 'bold' }}
            testID="payment_number_credit_card_id"
          >
            {paymentDetail.creditCard.number + '  '}
          </Text>
          <Icon
            testID="payment_icon_credit_card_id"
            name="credit-card"
            size={16}
          />
        </View>
      </View>
      <TouchableOpacity
        style={{
          height: 53,
          backgroundColor: colors.primary,
          borderRadius: 16,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        testID="confirm_purchase_button_id"
        onPress={confirmPurchase}
      >
        <Text style={{ color: colors.secondary, fontWeight: 'bold' }}>
          {'Confirm purchase'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Purchase;
