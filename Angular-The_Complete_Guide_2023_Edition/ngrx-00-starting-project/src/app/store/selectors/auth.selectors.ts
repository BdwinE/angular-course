import { createSelector } from '@ngrx/store';
import { StoreModel } from '../store.model';

export const userSelector = createSelector(
  (state: StoreModel) => {
    return state.authReducer;
  },
  (state) => state.user
);

export const authSelector = createSelector(
  (state: StoreModel) => {
    return state.authReducer;
  },
  (state) => {
    return state;
  }
);
