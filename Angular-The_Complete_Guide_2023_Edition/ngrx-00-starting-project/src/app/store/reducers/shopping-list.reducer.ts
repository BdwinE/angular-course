import { createReducer, on } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.model';
import {
  addIngredientAction,
  addIngredientsAction,
  deleteIngredientAction,
  editAction,
  resetEditAction,
  updateIngredientAction,
} from '../actions/shopping-list.actions';
import { IngredientsListStoreModel } from 'src/app/store/store.model';

const ingredientsState: IngredientsListStoreModel = {
  ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)],
  edit: { editedIngredient: null, editedIngredientIndex: -1 },
};
export const shoppingListReducer = createReducer(
  ingredientsState,
  on(addIngredientAction, (state, action) => {
    const newIngredients = state.ingredients.slice();
    newIngredients.push(action.ingredient);
    const newState = JSON.parse(JSON.stringify(state)); //remove readonly from properties
    newState['ingredients'] = newIngredients;
    return newState;
  }),
  on(addIngredientsAction, (state, action) => {
    const newIngredients = state.ingredients.slice();
    newIngredients.push(...action.ingredients);

    const newState = JSON.parse(JSON.stringify(state)); //remove readonly from properties
    newState['ingredients'] = newIngredients;
    return newState;
  }),
  on(updateIngredientAction, (state, action) => {
    const newIngredients = state.ingredients.slice();
    newIngredients[action.index] = action.newIngredient;

    const newState = JSON.parse(JSON.stringify(state)); //remove readonly from properties
    newState['ingredients'] = newIngredients;
    return newState;
  }),
  on(deleteIngredientAction, (state, action) => {
    const newIngredients = state.ingredients.slice();
    newIngredients.splice(action.index, 1);

    const newState = JSON.parse(JSON.stringify(state)); //remove readonly from properties
    newState['ingredients'] = newIngredients;
    return newState;
  }),
  on(editAction, (state, action) => {
    const newEditedIngredientIndex = action.editIndex;
    const newEditedIngredientItem = action.editIngredientItem;

    const newState = JSON.parse(JSON.stringify(state)); //remove readonly from properties

    newState['edit']['editedIngredientIndex'] = newEditedIngredientIndex;
    newState['edit']['editedIngredient'] = newEditedIngredientItem;

    return newState;
  }),
  on(resetEditAction, (state, action) => {
    const newState = JSON.parse(JSON.stringify(state));
    newState['edit']['editedIngredientIndex'] = -1;
    newState['edit']['editedIngredient'] = null;
    return newState;
  })
);
