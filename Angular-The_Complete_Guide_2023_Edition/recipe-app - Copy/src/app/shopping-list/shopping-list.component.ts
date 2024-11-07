import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../services/shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: 'shopping-list.component.html',
  providers: [],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = this.shoppingListService.getIngrdients();
  shoppingListSubscription: Subscription;

  onEditItem(i: number) {
    this.shoppingListService.starteEditing.next(i);
  }

  ngOnInit(): void {
    this.shoppingListSubscription =
      this.shoppingListService.ingredientsChangedEmitter.subscribe(
        (ingredients: Ingredient[]) => {
          this.ingredients = ingredients;
        }
      );
  }
  constructor(private shoppingListService: ShoppingListService) {}
  ngOnDestroy(): void {
    this.shoppingListSubscription.unsubscribe();
  }
}
