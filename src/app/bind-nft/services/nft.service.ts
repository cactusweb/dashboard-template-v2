import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from 'src/app/tools/services/auth.service';
import { ToolsService } from 'src/app/tools/services/tools.service';
import { apiUrl, errStatus } from '../const';
// import { Contract, Signer, ethers } from 'ethers';

declare global {
  interface Window { ethereum: any }
}

@Injectable({
  providedIn: 'root'
})
export class NftService {
  apiUrl = apiUrl;
  // provider;
  // public signer!: Signer

  constructor(
    private tools: ToolsService,
    private router: Router,
    private http: HttpClient,
    private auth: AuthService
  ) { }

  
  isMetaMaskConnected(): boolean {
    const { ethereum } = window;
    return Boolean(ethereum && ethereum.selectedAddress);
  }

  async onConnect() {
    try {
        // эта штука откроет окно метамаска, где запросит доступ на чтение кошелька
        return await window.ethereum.request({ method: 'eth_requestAccounts' });
    } catch (error) {
        return false;
    }
  }

  async getNonce(walletAddress: string) {
    let res: any = await this.http.get(`${this.apiUrl}/user/getNonce?publicAddress=${walletAddress}`).toPromise()
    return res.nonce || "";
  }

  
  createKey(signature: string, walletAddress: string){
    let headers = new HttpHeaders().set('authorization', `Bearer ${localStorage['accessToken']}`)
    return this.http.post(`${this.apiUrl}/user/createKey`, { walletAddress, signature }, { headers: headers })
      .pipe(
        catchError(err => {
          this.handleErrorOnCreate(err?.error?.status || (-8))
          return throwError(err)
        })
      )
  }


  private handleErrorOnCreate(status: number){
    this.tools.generateNotification(errStatus[(status * -1)-1]);
    if ( status === -1 )
      this.auth.auth();else
    if ( status === -3 )  
      this.router.navigate(['/dashboard'])
  }
}
