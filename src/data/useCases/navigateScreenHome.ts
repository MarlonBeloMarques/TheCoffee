import { RouteParams } from '~/domain/models';
import { Navigate } from '~/domain/useCases';
import { Routes } from '~/main/navigation';
import NavigateScreen from '../navigate/navigateScreen';

export default class NavigateScreenHome implements Navigate {
  constructor(readonly navigateScreen: NavigateScreen) {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  navigateToPurchase(params?: RouteParams | undefined): void {
    throw new Error('Method not implemented.');
  }

  navigateToHome(params?: RouteParams | undefined): void {
    this.navigateScreen.navigate(Routes.HOME, params);
  }
}
