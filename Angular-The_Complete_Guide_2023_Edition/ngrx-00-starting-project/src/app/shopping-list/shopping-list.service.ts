import { Injectable, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject, of, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { StoreModel } from '../store/store.model';
import { ingredientsSelector } from '../store/selectors/shopping-list.selectors';
import {
  addIngredientAction,
  addIngredientsAction,
  deleteIngredientAction,
  updateIngredientAction,
} from '../store/actions/shopping-list.actions';

@Injectable()
export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
  // private ingredients: Ingredient[] = [
  //   new Ingredient('Apples', 5),
  //   new Ingredient('Tomatoes', 10),
  // ];

  private ingredients: Ingredient[] = [];

  getIngredients() {
    console.log('IN GET INGREDIENTS');
    console.log(this.ingredients);
    return this.ingredients.slice();
  }

  getIngredients$() {
    return this.store.select(ingredientsSelector);
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  getIngredient$(index: number) {
    return this.getIngredients$().pipe(take(1), (ingredients) =>
      of(ingredients[index])
    );
  }

  addIngredient(ingredient: Ingredient) {
    //this.ingredients.push(ingredient);
    //this.ingredientsChanged.next(this.ingredients.slice());
    this.store.dispatch(addIngredientAction({ ingredient }));
  }

  addIngredients(ingredients: Ingredient[]) {
    //this.ingredients.push(...ingredients);
    //this.ingredientsChanged.next(this.ingredients.slice());
    this.store.dispatch(addIngredientsAction({ ingredients }));
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    //this.ingredients[index] = newIngredient;
    //this.ingredientsChanged.next(this.ingredients.slice());

    this.store.dispatch(
      updateIngredientAction({
        index: index,
        newIngredient: newIngredient,
      })
    );
  }

  deleteIngredient(index: number) {
    //this.ingredients.splice(index, 1);
    //this.ingredientsChanged.next(this.ingredients.slice());
    this.store.dispatch(deleteIngredientAction({ index: index }));
  }

  constructor(private store: Store) {
    this.store.select(ingredientsSelector).subscribe((ingredients) => {
      this.ingredients = ingredients;
    });
  }
}
