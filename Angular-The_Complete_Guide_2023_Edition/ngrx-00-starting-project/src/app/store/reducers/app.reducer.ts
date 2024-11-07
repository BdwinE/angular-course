import { ActionReducerMap, createReducer } from '@ngrx/store';
import { StoreModel } from 'src/app/store/store.model';
import { authReducer } from './auth.reducer';
import { shoppingListReducer } from './shopping-list.reducer';
import { recipeReducer } from './recipe.reducer';

export const mainAppReducer: ActionReducerMap<StoreModel> = {
  shoppingListReducer,
  authReducer,
  recipeReducer,
};
