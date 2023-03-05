import { RouteParams } from '../models';

export default interface NavigateToPurchase {
  navigate(params?: RouteParams): void;
}
