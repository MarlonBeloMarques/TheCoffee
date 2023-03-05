import { RouteParams } from '~/domain/models';
import { NavigateToPurchase } from '~/domain/useCases';
import { Routes } from '~/main/navigation';
import { NavigateScreen } from '../navigate';

export default class NavigateScreenPurchase implements NavigateToPurchase {
  constructor(readonly navigateScreen: NavigateScreen) {}

  navigate(params?: RouteParams | undefined): void {
    this.navigateScreen.navigate(Routes.PURCHASE, params);
  }
}
