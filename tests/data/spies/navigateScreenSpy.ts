import { NavigateScreen } from '~/data/navigate';

export class NavigateScreenSpy implements NavigateScreen {
  navigationRef: any;
  routeName!: string;
  params!: any;

  constructor(navigationRef: any) {
    this.navigationRef = navigationRef;
  }
  navigate(routeName: string, params?: GenericObject | undefined): void {
    this.routeName = routeName;
    this.params = params;
  }
}
