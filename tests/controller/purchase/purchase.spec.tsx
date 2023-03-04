import { Alert } from 'react-native';
import getSelectedOptionItemStub from '../../ui/stubs/selectedOptionItemStub';
import usePurchaseController from '../../../src/presentation/screens/purchase/usePurchaseController';

describe('Controller: Purchase', () => {
  test('should get the same coffee received by param', () => {
    const coffeeSelected = getSelectedOptionItemStub();
    const coffeeSelectedOfTypeString = JSON.stringify(coffeeSelected);
    const sut = usePurchaseController({
      coffeeSelected: coffeeSelectedOfTypeString,
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
    });

    sut.confirmPurchase();

    expect(Alert.alert).toHaveBeenCalled();
  });
});
