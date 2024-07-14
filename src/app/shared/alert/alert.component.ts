import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class alertComponent {
  @Input() message: string = '';
  @Output() seventEmit = new EventEmitter<string>();
  onClick() {
    this.seventEmit.emit(this.message);
  }
}
