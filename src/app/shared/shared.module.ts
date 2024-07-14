import { NgModule } from '@angular/core';
import { alertComponent } from './alert/alert.component';
import { spinnerComponent } from './loading/spinnder.component';
import { placeholderDirective } from './placeholder/placeholder.directive';
import { DropDownDirective } from './dropdown.directive';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    alertComponent,
    spinnerComponent,
    placeholderDirective,
    DropDownDirective,
  ],
  imports: [CommonModule],
  exports: [
    alertComponent,
    spinnerComponent,
    placeholderDirective,
    DropDownDirective,
    CommonModule,
  ],
})
export class sharedModule {}
