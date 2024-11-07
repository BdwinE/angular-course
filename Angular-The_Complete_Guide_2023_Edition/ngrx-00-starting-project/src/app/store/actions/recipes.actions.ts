import { createAction, props } from '@ngrx/store';
import { Recipe } from 'src/app/recipes/recipe.model';

export const SET_RECIPES = '[Recipes] Set Recipes';
export const FETCH_RECIPES = '[Recipes] Fetch Recipes';
export const ADD_RECIPE = '[Recipes] Add Recipes';
export const DELETE_RECIPE = '[Recipes] Delete Recipes';
export const UPDATE_RECIPE = '[Recipes] Update Recipes';

export const fetchRecipesAction = createAction(FETCH_RECIPES);
export const setRecipesAction = createAction(
  SET_RECIPES,
  props<{ recipes: Recipe[] }>()
);

export const addRecipeAction = createAction(
  ADD_RECIPE,
  props<{ recipe: Recipe }>()
);

export const updateRecipeAction = createAction(
  ADD_RECIPE,
  props<{ id: number; newRecipe: Recipe }>()
);

export const deleteRecipeAction = createAction(
  ADD_RECIPE,
  props<{ id: number }>()
);

export type RecipeActionsTypes =
  | typeof fetchRecipesAction
  | typeof setRecipesAction
  | typeof updateRecipeAction
  | typeof deleteRecipeAction
  | typeof addRecipeAction;
