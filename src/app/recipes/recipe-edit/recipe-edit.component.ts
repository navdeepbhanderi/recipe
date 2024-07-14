import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  id: number = 0;
  editMode = false;

  myForm: FormGroup | any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }
  recipeIngredients = new FormArray<any>([]);

  protected initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';

    if (this.editMode) {
      const recipe = this.recipeService.getRecipes(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe['ingrediensts']) {
        for (const ingredient of recipe.ingrediensts) {
          this.recipeIngredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/),
              ]),
            })
          );
        }
      }
    }

    this.myForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      img: new FormControl(recipeImagePath, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: this.recipeIngredients,
    });
  }
  get controls() {
    return (<FormArray>this.myForm.get('ingredients')).controls;
  }

  onSubmit() {
    const recipe = new Recipe(
      this.myForm.value['name'],
      this.myForm.value['description'],
      this.myForm.value['img'],
      this.myForm.value['ingredients']
    );
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, recipe);
      this.onCancel();
    } else {
      this.recipeService.addRecipe(recipe);
      this.onCancel();
    }
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  addIngredient() {
    console.log(this.recipeIngredients);

    (<FormArray>this.myForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      })
    );
  }
  deleteIngControl(index: number) {
    (<FormArray>this.myForm.get('ingredients')).removeAt(index);
  }
}
