import { NavigateScreenSpy } from '../../data/spies/navigateScreenSpy';
import navigateScreenPurchaseFactory from '../../../src/main/factories/infra/navigateScreenPurchaseFactory';

describe('Factories: navigateScreenPurchaseFactory', () => {
  test('should factory NavigateScreenPurchase', () => {
    const navigate = new NavigateScreenSpy({ any: 'any_value' });
    const navigateScreenPurchase = navigateScreenPurchaseFactory(navigate);
    expect(navigateScreenPurchase).toEqual({
      navigateScreen: navigate,
    });
  });
});
