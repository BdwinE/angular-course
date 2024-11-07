import { createSelector } from '@ngrx/store';
import { StoreModel } from '../store.model';

export const recipesSelector = createSelector(
  (storeState: StoreModel) => storeState.recipeReducer,
  (recipesState) => recipesState.recipes
);
