import { RouteParams } from '~/domain/models';
import { Navigate } from '~/domain/useCases';
import { Routes } from '~/main/navigation';
import NavigateScreen from '../navigate/navigateScreen';

export default class NavigateScreenHome implements Navigate {
  constructor(readonly navigateScreen: NavigateScreen) {}

  navigateToHome(params?: RouteParams | undefined): void {
    this.navigateScreen.navigate(Routes.HOME, params);
  }
}
