import { Alert } from 'react-native';
import getSelectedOptionItemStub from '../../ui/stubs/selectedOptionItemStub';
import usePurchaseController from '../../../src/presentation/screens/purchase/usePurchaseController';

describe('Controller: Purchase', () => {
  test('should get the same coffee received by param', () => {
    const coffeeSelected = getSelectedOptionItemStub();
    const coffeeSelectedOfTypeString = JSON.stringify(coffeeSelected);
    const sut = usePurchaseController({
      coffeeSelected: coffeeSelectedOfTypeString,
      paymentDetail: getPaymentDetailStub(),
    });

    const coffee = sut.coffeeSelected;
    expect(coffee).toEqual(coffeeSelected);
  });

  test('should show alert with success when call confirmPurchase', () => {
    jest.spyOn(Alert, 'alert');

    const coffeeSelected = getSelectedOptionItemStub();
    const coffeeSelectedOfTypeString = JSON.stringify(coffeeSelected);
    const sut = usePurchaseController({
      coffeeSelected: coffeeSelectedOfTypeString,
      paymentDetail: getPaymentDetailStub(),
    });

    sut.confirmPurchase();

    expect(Alert.alert).toHaveBeenCalled();
  });

  test('should get the same payment detail received by param', () => {
    const coffeeSelected = getSelectedOptionItemStub();
    const paymentDetailStub = getPaymentDetailStub();
    const coffeeSelectedOfTypeString = JSON.stringify(coffeeSelected);
    const sut = usePurchaseController({
      coffeeSelected: coffeeSelectedOfTypeString,
      paymentDetail: paymentDetailStub,
    });

    const paymentDetail = sut.paymentDetail;
    expect(paymentDetail).toEqual(paymentDetailStub);
  });
});

const getPaymentDetailStub = () => {
  return {
    creditCard: {
      number: '**5012',
    },
  };
};
