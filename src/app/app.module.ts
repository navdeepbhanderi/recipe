import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { authComponent } from './auth/auth.component';
import { recipeRoutingModule } from './recipes/recipes-routing.module';
import { sharedModule } from './shared/shared.module';
import { coreModule } from './coreModule.module';
import { shoppingListRoutes } from './shopping-list/shoppingList-routes.module';
@NgModule({
  declarations: [AppComponent, authComponent, HeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    sharedModule,
    recipeRoutingModule,
    shoppingListRoutes,
    coreModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
