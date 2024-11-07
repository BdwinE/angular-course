import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
})
export class RecipeItemComponent implements OnInit {
  @Input() recipeData: Recipe;
  id: number = 0;
  // recipeOnClick() {
  //   this.recipeService.selectedRecipeEmitter.emit(this.recipeData);
  //   this.id = this.recipeService.getRecipeIndex(this.recipeData);
  // }

  constructor(private recipeService: RecipeService) {}
  ngOnInit(): void {
    this.id = this.recipeService.getRecipeIndex(this.recipeData);
  }
}
