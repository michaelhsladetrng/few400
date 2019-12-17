import * as fromRouter from '@ngrx/router-store';
import { from } from 'rxjs';

export interface AppState {

  router: fromRouter.RouterState.Minimal;
}

export const reducers = {
  router: fromRouter.routerReducer
};
