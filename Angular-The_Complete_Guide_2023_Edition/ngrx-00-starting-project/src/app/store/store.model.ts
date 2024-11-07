import { User } from '../auth/user.model';
import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from '../shared/ingredient.model';

export interface StoreModel {
  shoppingListReducer: IngredientsListStoreModel;
  authReducer: UserModel;
  recipeReducer: RecipesModel;
}

export interface IngredientsListStoreModel {
  ingredients: Ingredient[];
  edit: { editedIngredient: Ingredient; editedIngredientIndex: number };
}

export interface UserModel {
  user: User;
  authError: string;
  loading: boolean;
}

export interface RecipesModel {
  recipes: Recipe[];
}
