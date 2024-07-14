import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RecipeService } from '../../recipe.service';
import { Ingredient } from 'src/app/shared/ingredients.model';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
})
export class RecipeItemComponent {
  constructor(private recipeService: RecipeService) {}
  @Input() item: Recipe | any;
  @Input() id:number = 0
  onselected() {
    this.recipeService.getSelectedRecipe.emit(this.item);
  }
}
