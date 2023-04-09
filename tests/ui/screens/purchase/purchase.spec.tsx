import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import getSelectedOptionItemStub from '../../../ui/stubs/selectedOptionItemStub';
import Purchase from '../../../../src/presentation/screens/purchase';

describe('UI: Purchase', () => {
  test('should show product name with success', () => {
    const {
      product,
      sut: { getByTestId },
    } = makeSut();
    const productName = getByTestId('product_name_id');

    expect(productName.props.children).toEqual(product.productName);
  });

  test('should show price of product in correct pattern', () => {
    const {
      product,
      sut: { getByTestId },
    } = makeSut();
    const productPrice = getByTestId('product_price_id');

    expect(productPrice.props.children).toEqual(
      `R$ ${product.productPrice.toFixed(2)}`,
    );
  });

  test('should show image of product with success', () => {
    const {
      product,
      sut: { getByTestId },
    } = makeSut();
    const productImage = getByTestId('product_image_id');
    expect(productImage.type).toEqual('Image');
    expect(productImage.props.source).toEqual(product.productImage);
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
  const product = getSelectedOptionItemStub();
  const paymentDetail = getPaymentDetailStub();

  const sut = render(
    <Purchase
      productSelected={product}
      paymentDetail={paymentDetail}
      confirmPurchase={confirmPurchase}
    />,
  );

  return { sut, paymentDetail, product };
};

const getPaymentDetailStub = () => {
  return {
    creditCard: {
      number: '**5012',
    },
  };
};
