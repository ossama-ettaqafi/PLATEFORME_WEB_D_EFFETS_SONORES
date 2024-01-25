import { CanActivateFn } from '@angular/router';

export const trackGuard: CanActivateFn = (route, state) => {
  return true;
};
