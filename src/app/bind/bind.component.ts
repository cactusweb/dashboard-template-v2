import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize, Subscription, take } from 'rxjs';
import { LicenseService } from '../dashboard/services/license.service';

@Component({
  selector: 'app-bind',
  templateUrl: './bind.component.html',
  styleUrls: ['./bind.component.scss']
})
export class BindComponent implements OnInit {
  form!: FormGroup
  loading: boolean = false;

  constructor(
    private lic: LicenseService,
    private router: Router
  ) {
    this.getLicense();
  }

  ngOnInit(): void {
    this.generateForm();
  }

  generateForm(){
    this.form = new FormGroup({
      key: new FormControl(null, Validators.required)
    })
  }

  getLicense(){
    if ( (this.lic.lastFetch + 10*1000) > Date.now() ) return
    this.lic.fetchLicense()
      .pipe(take(1))
      .subscribe({
        next: d => this.router.navigate(['/dashboard']),
        error: () => {}
      })
  }


  onBind(){
    this.form.markAllAsTouched();

    if ( this.form.invalid ) return;

    this.loading = true;
    this.lic.bindLicense( this.form.value )
      .pipe(
        take(1),
        finalize(() => this.loading = false)
      )
      .subscribe({
        next: () => {},
        error: () => {}
      })
  }

}
