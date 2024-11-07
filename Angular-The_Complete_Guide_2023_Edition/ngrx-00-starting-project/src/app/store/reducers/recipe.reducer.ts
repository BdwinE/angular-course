import { createReducer, on } from '@ngrx/store';
import {
  addRecipeAction,
  deleteRecipeAction,
  setRecipesAction,
  updateRecipeAction,
} from '../actions/recipes.actions';

let initialState = { recipes: [] };

export const recipeReducer = createReducer(
  initialState,
  on(setRecipesAction, (state, action) => {
    const newState = { ...state };
    newState.recipes = action.recipes;
    return newState;
  }),
  on(addRecipeAction, (state, action) => {
    const newState = { ...state };
    newState.recipes.push(action.recipe);
    return newState;
  }),
  on(deleteRecipeAction, (state, action) => {
    const newState = { ...state };
    newState.recipes.splice(action.id, 1);
    return newState;
  }),
  on(updateRecipeAction, (state, action) => {
    const newState = { ...state };
    newState.recipes[action.id] = action.newRecipe;
    return newState;
  })
);
