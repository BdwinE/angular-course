import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Recipe } from '../recipe.model';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { RecipeService } from 'src/app/services/recipe.service';
import { __values } from 'tslib';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit, AfterViewInit {
  editMode = false;
  recipe: Recipe;
  id: number; //for edit mode
  editIngridients: Ingredient[];
  bufferIngredients: Ingredient[] = [];
  @ViewChild('RecipeName') recipeName!: ElementRef;
  @ViewChild('RecipeDescription') recipeDescription!: ElementRef;
  @ViewChild('RecipeImagePath') RecipeImagePath!: ElementRef;
  @ViewChild('RecipeImagePath') RecipeIngredientName!: ElementRef;
  @ViewChild('RecipeImagePath') RecipeIngredientAmount!: ElementRef;

  onSubmitNewRecipe() {
    if (this.editMode) {
      if (
        this.recipe.ingredients.length === 0 &&
        this.bufferIngredients.length === 0
      ) {
        alert('please add atleast one ingredient');
        return;
      }
      const name = this.recipeName.nativeElement.value;
      const description = this.recipeDescription.nativeElement.value;
      const imagePath = this.RecipeImagePath.nativeElement.value;
      const ingredients = [
        ...this.recipe.ingredients,
        ...this.bufferIngredients,
      ];
      const updatedRecipe = new Recipe(
        name,
        description,
        imagePath,
        ingredients
      );
      this.rescipeService.updateRecipe(this.recipe, updatedRecipe);
      alert('Recipe Updated succesfully');
    } else {
      if (this.bufferIngredients.length === 0) {
        alert('please add atleast one ingredient');
        return;
      }
      const name = this.recipeName.nativeElement.value;
      const description = this.recipeDescription.nativeElement.value;
      const imagePath = this.RecipeImagePath.nativeElement.value;
      const ingredients = this.bufferIngredients;
      const recipe = new Recipe(name, description, imagePath, ingredients);
      this.rescipeService.addRecipe(recipe);
      alert('Recipe added succesfully');
    }
  }

  addIngredientToList(name: string, amount: string) {
    if (name === '' || Number(amount) === 0 || Number.isNaN(amount)) {
      alert('Please enter valid Ingredient and amout');
    } else {
      this.bufferIngredients.push(new Ingredient(name, Number(amount)));
    }
  }

  removeIngredient(index: number) {
    if (this.editMode) {
      this.recipe = this.rescipeService.removeIngredient(this.recipe, index);
    } else {
      this.bufferIngredients.splice(index, 1);
    }
  }

  setEditMode() {
    console.log('in edit mode');
    this.recipe = this.rescipeService.getRecipeById(this.id);
    this.bufferIngredients = [];

    console.log(this.recipeName.nativeElement);
    // this.r2.setAttribute(
    //   this.recipeName.nativeElement,
    //   'placeholder',
    //   recipe.name
    // );
    //this.recipeName.nativeElement.value = 'sdfsfd';
    this.r2.setProperty(
      this.recipeName.nativeElement,
      'value',
      this.recipe.name
    );
    // this.r2.setAttribute(
    //   this.recipeName.nativeElement,
    //   'value',
    //   'fdsfdfsdfbye'
    // );
    this.r2.setProperty(
      this.recipeDescription.nativeElement,
      'value',
      this.recipe.description
    );
    this.r2.setProperty(
      this.RecipeImagePath.nativeElement,
      'value',
      this.recipe.imagePath
    );
  }

  getIngredients(): Ingredient[] {
    return this.recipe.ingredients;
  }

  setNewMode() {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = Number(params['id']);
      this.editMode = params['id'] !== undefined;
      console.log(this.editMode);
      if (this.editMode) this.setEditMode();
      else this.setNewMode();
      this.cd.detectChanges();
    });
  }
  constructor(
    private route: ActivatedRoute,
    private rescipeService: RecipeService,
    private r2: Renderer2,
    private cd: ChangeDetectorRef
  ) {}
}
