import { RouteParams } from '~/domain/models';
import { Navigate } from '~/domain/useCases';
import { Routes } from '~/main/navigation';
import { NavigateScreen } from '../navigate';

export default class NavigateScreenPurchase implements Navigate {
  constructor(readonly navigateScreen: NavigateScreen) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  navigateToHome(params?: RouteParams | undefined): void {
    throw new Error('Method not implemented.');
  }
  navigateToPurchase(params?: RouteParams | undefined): void {
    this.navigateScreen.navigate(Routes.PURCHASE, params);
  }
}
