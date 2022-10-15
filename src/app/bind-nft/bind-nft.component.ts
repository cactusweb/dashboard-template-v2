import { Component, OnInit } from '@angular/core';
import { NftService } from './services/nft.service';

@Component({
  selector: 'app-bind-nft',
  templateUrl: './bind-nft.component.html',
  styleUrls: ['./bind-nft.component.scss']
})
export class BindNftComponent implements OnInit {
  isConnected: boolean = false;

  constructor(
    private nft: NftService
  ) { }

  ngOnInit(): void {
    // this.nft.createKey('asd', 'asdd')
    //   .subscribe({
    //     error: err => {}
    //   })
  }



}
