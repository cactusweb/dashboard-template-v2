import { Component, OnInit } from '@angular/core';
import { NftService } from '../../services/nft.service';

@Component({
  selector: 'app-status-err',
  templateUrl: './status-err.component.html',
  styleUrls: ['./status-err.component.scss']
})
export class StatusErrComponent implements OnInit {

  constructor(
    public nft: NftService
  ) { }

  ngOnInit(): void {
  }

}
