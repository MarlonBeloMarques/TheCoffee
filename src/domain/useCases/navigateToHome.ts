import { RouteParams } from '../models';

export default interface NavigateToHome {
  navigate(params?: RouteParams): void;
}
