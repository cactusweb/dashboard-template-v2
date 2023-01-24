import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'renew-success',
  templateUrl: './renew-success.component.html',
  styleUrls: ['./renew-success.component.scss']
})
export class RenewSuccessComponent {
  @Output() onClose = new EventEmitter()
  @Input() subtitle = 'The subscription was successfully renewed.'

  @HostListener('document:keydown.escape', ['$event'])
  onEscape(e: KeyboardEvent){
    this.onClose.emit();
  }
}
