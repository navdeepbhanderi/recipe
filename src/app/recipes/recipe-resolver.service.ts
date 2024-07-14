import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Recipe } from "./recipe.model";
import { Observable } from "rxjs";
import { dataStorageService } from "../shared/data-storage.service";
import { RecipeService } from "./recipe.service";

@Injectable({providedIn:'root'})

export class RecipeResolverService implements Resolve<Recipe[]>{
  constructor(private dataStorageService:dataStorageService, private recipeService:RecipeService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    const recipe = this.recipeService.getRecipe()
    if(recipe.length === 0){
      return this.dataStorageService.fetchRecipes()
    }else{
      return recipe
    }
  }
}