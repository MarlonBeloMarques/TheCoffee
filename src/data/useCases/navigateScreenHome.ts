import { RouteParams } from '~/domain/models';
import { NavigateToHome } from '~/domain/useCases';
import { Routes } from '~/main/navigation';
import NavigateScreen from '../navigate/navigateScreen';

export default class NavigateScreenHome implements NavigateToHome {
  constructor(readonly navigateScreen: NavigateScreen) {}

  navigate(params?: RouteParams | undefined): void {
    this.navigateScreen.navigate(Routes.HOME, params);
  }
}
