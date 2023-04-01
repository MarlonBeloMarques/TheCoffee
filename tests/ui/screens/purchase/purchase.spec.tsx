import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import getSelectedOptionItemStub from '../../../ui/stubs/selectedOptionItemStub';
import Purchase from '../../../../src/presentation/screens/purchase';

describe('UI: Purchase', () => {
  test('should show coffee name with success', () => {
    const {
      coffee,
      sut: { getByTestId },
    } = makeSut();
    const coffeeName = getByTestId('coffee_name_id');

    expect(coffeeName.props.children).toEqual(coffee.coffeeName);
  });

  test('should show price of coffee in correct pattern', () => {
    const {
      coffee,
      sut: { getByTestId },
    } = makeSut();
    const coffeePrice = getByTestId('coffee_price_id');

    expect(coffeePrice.props.children).toEqual(
      `R$ ${coffee.coffeePrice.toFixed(2)}`,
    );
  });

  test('should show image of coffee with success', () => {
    const {
      coffee,
      sut: { getByTestId },
    } = makeSut();
    const coffeeImage = getByTestId('coffee_image_id');
    expect(coffeeImage.type).toEqual('Image');
    expect(coffeeImage.props.source).toEqual(coffee.coffeeImage);
  });

  test('should show payment description with success', () => {
    const {
      sut: { getByTestId },
    } = makeSut();
    const paymentDescription = getByTestId('payment_description_id');

    expect(paymentDescription.props.children).toEqual('Pay with credit card: ');
  });

  test('should show payment number credit card with success', () => {
    const {
      paymentDetail,
      sut: { getByTestId },
    } = makeSut();
    const numberCreditCard = getByTestId('payment_number_credit_card_id');

    expect(numberCreditCard.props.children).toEqual(
      `${paymentDetail.creditCard.number}  `,
    );
  });

  test('should show payment icon credit card with success', () => {
    const {
      sut: { getByTestId },
    } = makeSut();
    const iconCreditCard = getByTestId('payment_icon_credit_card_id');

    expect(iconCreditCard).toBeTruthy();
  });

  test('should show confirm purchase button with correct description', () => {
    const {
      sut: { getByTestId },
    } = makeSut();
    const confirmPurchaseButton = getByTestId('confirm_purchase_button_id');

    expect(confirmPurchaseButton).toBeTruthy();
    const descriptionButton = confirmPurchaseButton.props.children[0];
    expect(descriptionButton.props.children).toEqual('Confirm purchase');
  });

  test('should call confirmPurchase when press the button', () => {
    const confirmPurchase = jest.fn();
    const {
      sut: { getByTestId },
    } = makeSut(confirmPurchase);
    const confirmPurchaseButton = getByTestId('confirm_purchase_button_id');

    fireEvent.press(confirmPurchaseButton);

    expect(confirmPurchase).toHaveBeenCalledTimes(1);
  });
});

const makeSut = (confirmPurchase = () => {}) => {
  const coffee = getSelectedOptionItemStub();
  const paymentDetail = getPaymentDetailStub();

  const sut = render(
    <Purchase
      coffeeSelected={coffee}
      paymentDetail={paymentDetail}
      confirmPurchase={confirmPurchase}
    />,
  );

  return { sut, paymentDetail, coffee };
};

const getPaymentDetailStub = () => {
  return {
    creditCard: {
      number: '**5012',
    },
  };
};
