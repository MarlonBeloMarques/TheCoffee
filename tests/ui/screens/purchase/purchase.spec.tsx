import React from 'react';
import { render } from '@testing-library/react-native';
import getSelectedOptionItemStub from '../../../ui/stubs/selectedOptionItemStub';
import Purchase from '../../../../src/presentation/screens/purchase';

describe('UI: Purchase', () => {
  test('should show coffee name with success', () => {
    const coffee = getSelectedOptionItemStub();
    const { getByTestId } = render(
      <Purchase
        coffeeSelected={coffee}
        paymentDetail={getPaymentDetailStub()}
      />,
    );
    const coffeeName = getByTestId('coffee_name_id');
    expect(coffeeName.props.children).toEqual(coffee.coffeeName);
  });

  test('should show price of coffee in correct pattern', () => {
    const coffee = getSelectedOptionItemStub();
    const { getByTestId } = render(
      <Purchase
        coffeeSelected={coffee}
        paymentDetail={getPaymentDetailStub()}
      />,
    );
    const coffeePrice = getByTestId('coffee_price_id');
    expect(coffeePrice.props.children).toEqual(
      `R$ ${coffee.coffeePrice.toFixed(2)}`,
    );
  });

  test('should show image of coffee with success', () => {
    const coffee = getSelectedOptionItemStub();
    const { getByTestId } = render(
      <Purchase
        coffeeSelected={coffee}
        paymentDetail={getPaymentDetailStub()}
      />,
    );
    const coffeeImage = getByTestId('coffee_image_id');
    expect(coffeeImage.type).toEqual('Image');
    expect(coffeeImage.props.source).toEqual(coffee.coffeeImage);
  });

  test('should show payment description with success', () => {
    const coffee = getSelectedOptionItemStub();
    const { getByTestId } = render(
      <Purchase
        coffeeSelected={coffee}
        paymentDetail={getPaymentDetailStub()}
      />,
    );
    const paymentDescription = getByTestId('payment_description_id');
    expect(paymentDescription.props.children).toEqual('Pay with credit card:');
  });

  test('should show payment number credit card with success', () => {
    const coffee = getSelectedOptionItemStub();
    const paymentDetail = getPaymentDetailStub();
    const { getByTestId } = render(
      <Purchase coffeeSelected={coffee} paymentDetail={paymentDetail} />,
    );
    const numberCreditCard = getByTestId('payment_number_credit_card_id');
    expect(numberCreditCard.props.children).toEqual(
      paymentDetail.creditCard.number,
    );
  });
});

const getPaymentDetailStub = () => {
  return {
    creditCard: {
      number: '**5012',
    },
  };
};
