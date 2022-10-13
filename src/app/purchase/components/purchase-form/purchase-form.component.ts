import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize, take } from 'rxjs';
import { DropService } from '../../services/drop.service';

@Component({
  selector: 'purchase-form',
  templateUrl: './purchase-form.component.html',
  styleUrls: ['./purchase-form.component.scss']
})
export class PurchaseFormComponent implements OnInit {
  form!: FormGroup
  loading: boolean = false

  constructor(
    private drop: DropService,
  ) { }

  ngOnInit(): void {
    this.generateForm();
  }

  generateForm(){
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      agreement: new FormControl(false)
    })
  }

  onSubmit(){
    this.form.markAllAsTouched();
    if ( this.form.invalid || !this.form.controls['agreement'].value ) return;

    this.loading = true;
    this.drop.onPurchase( this.form.controls['email'].value )
      .pipe(
        take(1),
      )
      .subscribe({
        error: () => this.loading = false,
        next: d => d.key ? this.loading = false : null
      })

  }

}
