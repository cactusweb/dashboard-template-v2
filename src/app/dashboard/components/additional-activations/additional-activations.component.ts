import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/purchase/interfaces/order';
import { LicenseService } from '../../services/license.service';

@Component({
  selector: 'app-additional-activations',
  templateUrl: './additional-activations.component.html',
  styleUrls: ['./additional-activations.component.scss']
})
export class AdditionalActivationsComponent implements OnInit {
  showAdditionalForm: boolean = false;
  order: Order|undefined

  showSuccessWindow: boolean = false;
  
  constructor(
    private lic: LicenseService
  ) { }

  ngOnInit(): void {
  }

  onSuccessRenew(){
    this.lic.addActivation();
    this.showSuccessWindow = true;
    this.showAdditionalForm = false;
    this.order = undefined;
  }

}
