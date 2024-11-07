import { createSelector } from '@ngrx/store';
import { StoreModel } from 'src/app/store/store.model';

export const ingredientsSelector = (state: StoreModel) => {
  return state.shoppingListReducer.ingredients;
};

export const ingredientSelector = createSelector(
  ingredientsSelector,
  (state) => state
);

export const editedIngredientSelector = (state: StoreModel) =>
  state.shoppingListReducer.edit;
