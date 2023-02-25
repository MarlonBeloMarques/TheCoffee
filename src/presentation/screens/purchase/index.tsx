import React from 'react';
import { Text, View } from 'react-native';
import { Coffee } from '../../../presentation/viewModels/model/homeViewModel';

type PurchaseProps = {
  coffeeSelected: Coffee;
};

const Purchase: React.FC<PurchaseProps> = ({ coffeeSelected }) => {
  return (
    <View>
      <View>
        <Text testID="coffee_name_id">{coffeeSelected.coffeeName}</Text>
        <Text testID="coffee_price_id">{`R$ ${coffeeSelected.coffeePrice.toFixed(
          2,
        )}`}</Text>
      </View>
    </View>
  );
};

export default Purchase;
