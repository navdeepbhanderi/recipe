import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[placeholder]',
})
export class placeholderDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
