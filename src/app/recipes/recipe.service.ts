import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredients.model';
import { shoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
  recipeChanged = new Subject<Recipe[]>();
  constructor(private shoppingService: shoppingListService) {}
  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'A test recipe',
  //     'this is test',
  //     'https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=600',
  //     [new Ingredient('erewfe', 23), new Ingredient('erewfe', 23)]
  //   ),
  //   new Recipe(
  //     'A test recipe2',
  //     'this is test2',
  //     'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=600',
  //     [new Ingredient('erewfe', 23), new Ingredient('erewfe', 23)]
  //   ),
  //   new Recipe(
  //     'A test recipe',
  //     'this is test3',
  //     'https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=600',
  //     [new Ingredient('erewfe', 23), new Ingredient('erewfe', 23)]
  //   ),
  //   new Recipe(
  //     'A test recipe',
  //     'this is test3',
  //     'https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=600',
  //     [new Ingredient('erewfe', 23), new Ingredient('erewfe', 23)]
  //   ),
  // ];
  private recipes: Recipe[] = [];

  getRecipe() {
    this.recipeChanged.next(this.recipes.slice());
    return this.recipes.slice();
  }
  getRecipes(id: number) {
    return this.recipes[id];
  }

  recipeSelected: boolean = false;
  addIngredientsToShoppingList(ingrediensts: Ingredient[]) {
    this.shoppingService.addFromRecipeList(ingrediensts);
  }

  getSelectedRecipe = new EventEmitter<Recipe>();

  deleteRecipeIngredients(recipeId: number, index: number) {
    console.log(this.recipes[recipeId].ingrediensts.splice(index, 1));
  }

  getRecipeSelected(id: number) {
    return this.recipes[id];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    console.log('calles');
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }
  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }
  overrideRecipes(recipe: Recipe[]) {
    this.recipes = recipe;
    this.recipeChanged.next(this.recipes.slice());
  }
}
