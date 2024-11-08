import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { StoreModel } from 'src/app/store/store.model';
import { Store } from '@ngrx/store';
import {
  addIngredientAction,
  deleteIngredientAction,
  editAction,
  resetEditAction,
  updateIngredientAction,
} from 'src/app/store/actions/shopping-list.actions';
import { editedIngredientSelector } from 'src/app/store/selectors/shopping-list.selectors';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) slForm: NgForm;
  subscription: Subscription;
  tempSubscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(
    private slService: ShoppingListService,
    private store: Store<StoreModel>
  ) {}

  ngOnInit() {
    console.log('Initial mode: ' + this.editMode);
    this.subscription = this.store
      .select(editedIngredientSelector)
      .subscribe((editedIngredientData) => {
        console.log('Ingredient data');
        console.log(editedIngredientData);
        if (editedIngredientData.editedIngredientIndex === -1) {
          this.editMode = false;
        } else {
          this.editMode = true;
          this.editedItemIndex = editedIngredientData.editedIngredientIndex;
          this.editedItem = editedIngredientData.editedIngredient;
          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount,
          });
        }
      });

    // this.subscription = this.slService.startedEditing.subscribe(
    //   (index: number) => {
    //     this.editedItemIndex = index;
    //     this.editMode = true;
    //     this.editedItem = this.slService.getIngredient(index);
    //     this.slForm.setValue({
    //       name: this.editedItem.name,
    //       amount: this.editedItem.amount,
    //     });
    //   }
    // );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.slService.updateIngredient(this.editedItemIndex, newIngredient);
      // this.store.dispatch(
      //   updateIngredientAction({
      //     index: this.editedItemIndex,
      //     newIngredient: newIngredient,
      //   })
      // );
    } else {
      this.slService.addIngredient(newIngredient);
      // this.store.dispatch(addIngredientAction({ ingredient: newIngredient }));
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.store.dispatch(resetEditAction());
    this.editMode = false;
  }

  onDelete() {
    this.slService.deleteIngredient(this.editedItemIndex);
    // this.store.dispatch(
    //   deleteIngredientAction({ index: this.editedItemIndex })
    // );
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.store.dispatch(resetEditAction());
  }
}
