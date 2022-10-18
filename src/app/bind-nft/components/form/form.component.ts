import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { NftService } from '../../services/nft.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  loading: boolean = false;
  connected: boolean = false;


  constructor(
    public nft: NftService,
  ) { }

  ngOnInit() {
    if ( document.readyState != 'complete' )
      window.addEventListener('load', () => this.onConnectWallet())
    else this.onConnectWallet()
  }

  async onConnectWallet(){
    this.loading = true;
    this.connected = await this.nft.connectWallet();
    this.loading = false;
  }

  async getLicense(){
    this.loading = true;
    
    try{
      let nonce = await this.nft.getNonce(window.ethereum.selectedAddress)
      let signature = await this.nft.getSignature(nonce)
      
      this.nft.createKey( signature, window.ethereum.selectedAddress )
        .pipe(
          finalize(() => this.loading = false)
        )
        .subscribe({error: () => {}})
    }
    catch(e){
      this.loading = false;
    }
  }

}
