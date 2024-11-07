import { createAction, props } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.model';

export const addIngredientAction = createAction(
  '[Shopping List] Add Ingredient',
  props<{ ingredient: Ingredient }>()
);

export const addIngredientsAction = createAction(
  '[Shopping List] Add Ingredients',
  props<{ ingredients: Ingredient[] }>()
);

export const updateIngredientAction = createAction(
  '[Shopping List] Update Ingredient',
  props<{ index: number; newIngredient: Ingredient }>()
);

export const deleteIngredientAction = createAction(
  '[Shopping List] Delete Ingredient',
  props<{ index: number }>()
);

export const editAction = createAction(
  '[Shopping List] Start Edit',
  props<{ editIndex: number; editIngredientItem: Ingredient }>()
);

export const resetEditAction = createAction('[Shopping List] Reset Edit');
