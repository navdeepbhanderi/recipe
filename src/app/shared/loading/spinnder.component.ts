import { Component } from "@angular/core";

@Component({
  selector:'app-spinner',
  template:`<div class="lds-ring">
  <div></div>
  <div></div>
  <div></div>
  <div></div>
</div>`,
  styleUrls: ['./spinnder.component.css'],
})

export class spinnerComponent{}