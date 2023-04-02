import { Alert } from 'react-native';
import { renderHook } from '@testing-library/react-native';
import { NavigateToHome } from '~/domain/useCases';
import getSelectedOptionItemStub from '../../ui/stubs/selectedOptionItemStub';
import usePurchaseController from '../../../src/presentation/screens/purchase/usePurchaseController';

describe('Controller: Purchase', () => {
  test('should get the same coffee received by param', () => {
    const { sut, coffeeSelected } = makeSut();

    const coffee = sut.result.current.coffeeSelected;
    expect(coffee).toEqual(coffeeSelected);
  });

  test('should show alert with success when call confirmPurchase', () => {
    jest.spyOn(Alert, 'alert');

    const { sut } = makeSut();
    sut.result.current.confirmPurchase();

    expect(Alert.alert).toHaveBeenCalled();
  });

  test('should navigate to home when call confirmPurchase', () => {
    const { sut, navigateScreenSpy } = makeSut();
    sut.result.current.confirmPurchase();

    expect(navigateScreenSpy.navigateToHomeCalled).toEqual(true);
  });

  test('should show log of console when press the confirm button of alert', () => {
    const alertSpy = jest.spyOn(Alert, 'alert');
    const logSpy = jest.spyOn(console, 'log');
    const { sut } = makeSut();

    sut.result.current.confirmPurchase();

    alertSpy.mock.calls[0][2][0].onPress();
    expect(logSpy).toHaveBeenCalledWith('confirm purchase clicked');
  });

  test('should get the same payment detail received by param', () => {
    const { sut, paymentDetailStub } = makeSut();

    const paymentDetail = sut.result.current.paymentDetail;
    expect(paymentDetail).toEqual(paymentDetailStub);
  });
});

const makeSut = () => {
  const navigateScreenSpy = new NavigateSpy();

  const paymentDetailStub = getPaymentDetailStub();
  const coffeeSelected = getSelectedOptionItemStub();
  const coffeeSelectedOfTypeString = JSON.stringify(coffeeSelected);

  const sut = renderHook(() =>
    usePurchaseController({
      coffeeSelected: coffeeSelectedOfTypeString,
      paymentDetail: paymentDetailStub,
      navigateToHome: navigateScreenSpy,
    }),
  );

  return { sut, paymentDetailStub, navigateScreenSpy, coffeeSelected };
};

const getPaymentDetailStub = () => {
  return {
    creditCard: {
      number: '**5012',
    },
  };
};

class NavigateSpy implements NavigateToHome {
  navigateToHomeCalled = false;

  navigate(): void {
    this.navigateToHomeCalled = true;
  }
}
