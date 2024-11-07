import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { LoggingService } from '../logging.service';
import { StoreModel } from '../store/store.model';
import { Store } from '@ngrx/store';
import { ingredientsSelector } from '../store/selectors/shopping-list.selectors';
import { editAction } from '../store/actions/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  //ingredients: Ingredient[];
  ingredients$: Observable<Ingredient[]>;
  //private subscription: Subscription;

  constructor(
    private slService: ShoppingListService,
    private store: Store<StoreModel>
  ) {}

  ngOnInit() {
    //this.ingredients = this.slService.getIngredients();
    // this.subscription = this.slService.ingredientsChanged.subscribe(
    //   (ingredients: Ingredient[]) => {
    //     this.ingredients = ingredients;
    //   }
    // );

    //this.ingredients$ = this.store.select(ingredientsSelector);
    this.ingredients$ = this.slService.getIngredients$();
  }

  onEditItem(index: number, ingredient: Ingredient) {
    //this.slService.startedEditing.next(index);
    this.store.dispatch(
      editAction({ editIndex: index, editIngredientItem: ingredient })
    );
  }

  ngOnDestroy() {
    //this.subscription.unsubscribe();
  }
}
