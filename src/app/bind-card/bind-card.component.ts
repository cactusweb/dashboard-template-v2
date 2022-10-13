import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { LicenseService } from '../dashboard/services/license.service';
import { BindCardService } from './services/bind-card.service';

@Component({
  selector: 'bind-card',
  templateUrl: './bind-card.component.html',
  styleUrls: ['./bind-card.component.scss']
})
export class BindCardComponent implements OnInit {
  form!: FormGroup
  loading: boolean = false;

  @Output() onClose = new EventEmitter()

  constructor(
    private bind: BindCardService,
    private lic: LicenseService
  ) { }
  
  ngOnInit(): void {
    this.generateForm();
  }

  generateForm(){
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      agreement: new FormControl(false)
    })

    this.lic.getLicense()
      .pipe(take(1))
      .subscribe({
        next: d => this.form.patchValue({...d.payment})
      })
  }
  
  onSubmit(){
    this.form.markAllAsTouched();
    if ( this.form.invalid || !this.form.controls['agreement'].value ) return;

    this.loading = true;

    this.bind.goToPayment( this.form.controls['email'].value )
      .pipe(
        take(1)
      )
    .subscribe({
      error: () => this.loading = false,
    })

  }

}
