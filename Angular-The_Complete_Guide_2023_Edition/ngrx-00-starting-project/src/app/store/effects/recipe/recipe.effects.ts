import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { FETCH_RECIPES, setRecipesAction } from '../../actions/recipes.actions';
import { map, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Recipe } from 'src/app/recipes/recipe.model';

export const fetchRecipesEffect = createEffect(
  (actions$ = inject(Actions), http = inject(HttpClient)) => {
    return actions$.pipe(
      ofType(FETCH_RECIPES),
      switchMap(() =>
        http.get<Recipe[]>(
          'https://recipe-app-project-98dbb-default-rtdb.firebaseio.com/recipes.json'
        )
      ),
      map((recipes) => {
        return recipes.map((recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          };
        });
      }),
      map((recipes) => {
        //this.recipeService.setRecipes(recipes);
        //store.dispatch(setRecipesAction({ recipes: recipes }));
        return setRecipesAction({ recipes: recipes });
      })
    );
  },
  { functional: true, dispatch: true }
);
