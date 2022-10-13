import { Component, Input, OnInit } from '@angular/core';
import { ToolsService } from 'src/app/tools/services/tools.service';
import { LicenseReferral } from '../../interfaces/license-referral';

@Component({
  selector: 'app-referral',
  templateUrl: './referral.component.html',
  styleUrls: ['./referral.component.scss']
})
export class ReferralComponent implements OnInit {
  @Input() referral!: LicenseReferral; 
  viewGifts: boolean = false;

  constructor(
    public tools: ToolsService
  ) { }

  ngOnInit(): void {
  }

}
