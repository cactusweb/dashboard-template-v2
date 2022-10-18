import { Component, OnDestroy, OnInit } from '@angular/core';
import { NftService } from './services/nft.service';

@Component({
  selector: 'app-bind-nft',
  templateUrl: './bind-nft.component.html',
  styleUrls: ['./bind-nft.component.scss']
})
export class BindNftComponent implements OnInit, OnDestroy {
  isConnected: boolean = false;


  constructor(
    public nft: NftService,
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.nft.changeBindStatus('form')
  }
}
