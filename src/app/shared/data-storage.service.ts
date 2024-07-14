import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { exhaustMap, map, take, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class dataStorageService implements OnInit {
  ngOnInit(): void {}
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}
  storeRecipes() {
    const recipe = this.recipeService.getRecipe();
    this.http
      .put(
        'https://angular-firebase-6d19d-default-rtdb.firebaseio.com/recipes.json',
        recipe
      )
      .subscribe(
        (res) => {
          console.log(res);
        },
        (error) => {
          console.log(error);
        }
      );
  }
  fetchRecipes() {
    return this.http
      .get<Recipe[]>(
        'https://angular-firebase-6d19d-default-rtdb.firebaseio.com/recipes.json'
      )
      .pipe(
        map((recipe) => {
          return recipe.map((rec) => {
            return {
              ...rec,
              ingrediensts: rec.ingrediensts ? rec.ingrediensts : [],
            };
          });
        }),
        tap((rec: Recipe[]) => {
          this.recipeService.overrideRecipes(rec);
        })
      );
  }
}
