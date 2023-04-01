import { NavigateScreenSpy } from '../../data/spies/navigateScreenSpy';
import navigateScreenHomeFactory from '../../../src/main/factories/infra/navigateScreenHomeFactory';

describe('Factories: navigateScreenHomeFactory', () => {
  test('should factory NavigateScreenHome', () => {
    const navigate = new NavigateScreenSpy({ any: 'any_value' });
    const navigateScreenHome = navigateScreenHomeFactory(navigate);
    expect(navigateScreenHome).toEqual({
      navigateScreen: navigate,
    });
  });
});
