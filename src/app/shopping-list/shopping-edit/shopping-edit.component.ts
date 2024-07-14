import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredients.model';
import { shoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  constructor(private shoppingService: shoppingListService) {}
  subscription: Subscription | any;
  editMode = false;
  editedItemIndex: number | any;
  editedItem: Ingredient | any;
  @ViewChild('ref') slForm: NgForm | any;
  ngOnInit(): void {
    this.subscription = this.shoppingService.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedItem = this.shoppingService.getIngredient(index);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        });
      }
    );
  }
  addShoppingList(event: Event) {
    event.preventDefault();
  }
  onSubmit(form: NgForm) {
    const value = form.value;
    const ingredient = new Ingredient(value.name, value.amount);
    if (!this.editMode) {
      this.shoppingService.addIngredients(ingredient);
    } else {
      this.shoppingService.updateIngredient(this.editedItemIndex, ingredient);
    }
    this.editMode = false;
    this.slForm.reset();
  }
  onDelete() {
    this.shoppingService.deleteIngredients(this.editedItemIndex);
    this.onClear();
  }
  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
