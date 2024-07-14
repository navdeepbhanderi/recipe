import { NgModule } from '@angular/core';
import { shoppingListService } from './shopping-list/shopping-list.service';
import { RecipeService } from './recipes/recipe.service';
import { dataStorageService } from './shared/data-storage.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorClass } from './auth/auth-interceptors.service';

@NgModule({
  providers: [
    shoppingListService,
    RecipeService,
    dataStorageService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorClass, multi: true },
  ],
})
export class coreModule {}
