import { Alert } from 'react-native';
import { Navigate } from '~/domain/useCases';
import getSelectedOptionItemStub from '../../ui/stubs/selectedOptionItemStub';
import usePurchaseController from '../../../src/presentation/screens/purchase/usePurchaseController';

describe('Controller: Purchase', () => {
  test('should get the same coffee received by param', () => {
    const navigateScreen = new NavigateSpy();

    const coffeeSelected = getSelectedOptionItemStub();
    const coffeeSelectedOfTypeString = JSON.stringify(coffeeSelected);
    const sut = usePurchaseController({
      coffeeSelected: coffeeSelectedOfTypeString,
      paymentDetail: getPaymentDetailStub(),
      navigate: navigateScreen,
    });

    const coffee = sut.coffeeSelected;
    expect(coffee).toEqual(coffeeSelected);
  });

  test('should show alert with success when call confirmPurchase', () => {
    const navigateScreen = new NavigateSpy();
    jest.spyOn(Alert, 'alert');

    const coffeeSelected = getSelectedOptionItemStub();
    const coffeeSelectedOfTypeString = JSON.stringify(coffeeSelected);
    const sut = usePurchaseController({
      coffeeSelected: coffeeSelectedOfTypeString,
      paymentDetail: getPaymentDetailStub(),
      navigate: navigateScreen,
    });

    sut.confirmPurchase();

    expect(Alert.alert).toHaveBeenCalled();
  });

  test('should navigate to home when call confirmPurchase', () => {
    const navigateScreen = new NavigateSpy();

    const coffeeSelected = getSelectedOptionItemStub();
    const coffeeSelectedOfTypeString = JSON.stringify(coffeeSelected);
    const sut = usePurchaseController({
      coffeeSelected: coffeeSelectedOfTypeString,
      paymentDetail: getPaymentDetailStub(),
      navigate: navigateScreen,
    });

    sut.confirmPurchase();

    expect(navigateScreen.navigateToHomeCalled).toEqual(true);
  });

  test('should get the same payment detail received by param', () => {
    const navigateScreen = new NavigateSpy();

    const coffeeSelected = getSelectedOptionItemStub();
    const paymentDetailStub = getPaymentDetailStub();
    const coffeeSelectedOfTypeString = JSON.stringify(coffeeSelected);
    const sut = usePurchaseController({
      coffeeSelected: coffeeSelectedOfTypeString,
      paymentDetail: paymentDetailStub,
      navigate: navigateScreen,
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

class NavigateSpy implements Navigate {
  navigateToHomeCalled = false;

  navigateToHome(): void {
    this.navigateToHomeCalled = true;
  }
}
