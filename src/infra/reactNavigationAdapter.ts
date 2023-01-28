import {
  CommonActions,
  NavigationContainerRef,
} from '@react-navigation/native';
import { NavigateScreen } from '~/data/navigate';

export default class ReactNavigationAdapter implements NavigateScreen {
  constructor(readonly navigation: NavigationContainerRef<any>) {}

  navigate(routeName: string, params?: GenericObject | undefined): void {
    this.navigation.dispatch(
      CommonActions.navigate({ name: routeName, params: params }),
    );
  }
}
