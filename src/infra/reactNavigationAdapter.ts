import { CommonActions } from '@react-navigation/native';
import { NavigateScreen } from '~/data/navigate';
import { navigator } from '~/main/navigation';

export default class ReactNavigationAdapter implements NavigateScreen {
  constructor() {}

  navigate(routeName: string, params?: GenericObject | undefined): void {
    navigator.dispatch(
      CommonActions.navigate({ name: routeName, params: params }),
    );
  }
}
