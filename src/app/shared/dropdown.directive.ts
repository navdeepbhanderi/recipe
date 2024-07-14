import { Directive, ElementRef, HostBinding, HostListener } from "@angular/core";

@Directive({
  selector:'[appDropdown]'
})
export class DropDownDirective{
  @HostBinding('class.open') isOpen = false
  constructor(private eleRef:ElementRef) {}
  @HostListener("click") onClick(){
    this.isOpen = !this.isOpen
  }
}