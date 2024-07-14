import { Component, ViewEncapsulation } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent {
  selectedRecipe: Recipe | any;
  constructor(private recipeService: RecipeService) {}
  recipe: any;
  ngOnInit(): void {
    this.recipeService.getSelectedRecipe.subscribe((item: Recipe) => {
      this.selectedRecipe = item;
    });
  }
}
