import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

import { Recipe } from './recipe.model';
//import { DataStorageService } from '../shared/data-storage.service';
//import { RecipeService } from './recipe.service';
import { Store } from '@ngrx/store';
import { StoreModel } from '../store/store.model';
//import { recipesSelector } from '../store/selectors/recipe.selectors';
import { map, of, switchMap, take } from 'rxjs';
import {
  fetchRecipesAction,
  setRecipesAction,
} from '../store/actions/recipes.actions';
import { Actions, ofType } from '@ngrx/effects';
import { recipesSelector } from '../store/selectors/recipe.selectors';

@Injectable({ providedIn: 'root' })
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(
    //private dataStorageService: DataStorageService,
    //private recipesService: RecipeService,
    private store: Store<StoreModel>,
    private actions$: Actions
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // const recipes = this.recipesService.getRecipes();

    // if (recipes.length === 0) {
    //   return this.dataStorageService.fetchRecipes();
    // } else {
    //   return recipes;
    // }
    return this.store.select(recipesSelector).pipe(
      take(1),
      switchMap((recipes) => {
        if (recipes.length === 0) {
          this.store.dispatch(fetchRecipesAction());
          return this.actions$.pipe(
            ofType(setRecipesAction),
            take(1),
            map((recipesState) => recipesState.recipes)
          );
        }
        return of(recipes);
      })
    );
  }
}
