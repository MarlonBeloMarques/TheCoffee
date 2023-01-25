import { Routes } from '~/main/navigation';

declare global {
  namespace Modules {
    export { Routes };
  }
  namespace ReactNavigation {
    interface RootParamList {
      HOME: string;
      WELCOME: string;
    }
  }
}
