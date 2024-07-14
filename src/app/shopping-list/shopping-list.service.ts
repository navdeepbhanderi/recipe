import { EventEmitter, Injectable, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredients.model';
import { Subject, Subscription } from 'rxjs';

@Injectable()
export class shoppingListService implements OnDestroy {
  isChangedSub: Subscription | any;
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
  private ingredients: Ingredient[] = [
    new Ingredient('Apple', 5),
    new Ingredient('Tomato', 10),
  ];

  getIngredients() {
    return this.ingredients;
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index].name = newIngredient.name;
    this.ingredients[index].amount = newIngredient.amount;
  }

  deleteIngredients(index: number) {
    let item = this.ingredients.splice(index, 1);
    this.isChangedSub = this.ingredientsChanged.next(this.ingredients.slice());
    console.log(item);
  }

  addIngredients(item: any) {
    this.ingredients.push(item);
    console.log(this.ingredients);
    this.isChangedSub = this.ingredientsChanged.next(this.ingredients.slice());
  }

  addFromRecipeList(ingredients: Ingredient[]) {
    // for (const ingredient of ingredients) {
    //   this.addIngredients(ingredient);
    // }
    this.ingredients.push(...ingredients);
    this.isChangedSub = this.ingredientsChanged.next(this.ingredients.slice());
  }
  ngOnDestroy(): void {
    this.isChangedSub.unsubscribe();
  }
}
