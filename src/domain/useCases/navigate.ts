import { RouteParams } from '../models';

export interface Navigate {
  navigateToMyPlans(params?: RouteParams): void;
}
