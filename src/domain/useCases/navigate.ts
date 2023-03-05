import { RouteParams } from '../models';

export default interface Navigate {
  navigateToHome(params?: RouteParams): void;
  navigateToPurchase(params?: RouteParams): void;
}
