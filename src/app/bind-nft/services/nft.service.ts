import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { AuthService } from 'src/app/tools/services/auth.service';
import { ToolsService } from 'src/app/tools/services/tools.service';
import { apiUrl, errStatus } from '../const';
import { Contract, Signer, ethers } from 'ethers';

declare global {
  interface Window { ethereum: any }
}

@Injectable({
  providedIn: 'root'
})
export class NftService {
  private apiUrl = apiUrl;
  private provider;
  public signer!: Signer;
  
  private $bindStatus = new BehaviorSubject<'form'|'err'>('form')
  public bindStatus = this.$bindStatus.asObservable();



  constructor(
    private tools: ToolsService,
    private router: Router,
    private http: HttpClient,
    private auth: AuthService
  ) {
    if ( !window.ethereum ) return

    this.provider = new ethers.providers.Web3Provider(window.ethereum);
    this.signer = this.provider.getSigner();
  }

  async connectWallet(): Promise<boolean>{
    return this.isMetaMaskConnected() ? true : await this.onConnect()
  }

  private isMetaMaskConnected(): boolean {
    const { ethereum } = window;
    return Boolean(ethereum && ethereum.selectedAddress);
  }

  private async onConnect() {
    try {
        // эта штука откроет окно метамаска, где запросит доступ на чтение кошелька
        return await window.ethereum.request({ method: 'eth_requestAccounts' });
    } 
    catch (error: any) {
      let message
      if ( !window.ethereum ) message = 'Metamask not found';else
      if ( error?.message && error.code ) message = error.message;
      else message = 'Smth went wrong';

      this.tools.generateNotification( message )
      return false;
    }
  }



  async getNonce(walletAddress: string) {
    let res: any = await this.http.get(`${this.apiUrl}/user/getNonce?publicAddress=${walletAddress}`)
      .pipe(
        catchError(err => {
          this.tools.generateNotification(err.error?.message || 'Smth went wrong');
          return throwError(err)
        })
      )
    return res.nonce || "";
  }

  async getSignature(nonce: string): Promise<string>{
    try{
      return await this.signer.signMessage(nonce)
    }
    catch (error: any) {
      let message
      if ( !window.ethereum ) message = 'Metamask not found';else
      if ( error?.message && error.code == 'ACTION_REJECTED' ) message = 'User rejected signing'; else
      if ( error?.message && error.code ) message = error.message;
      else message = 'Smth went wrong';

      this.tools.generateNotification( message )
      throw new Error()
    }
  }

  
  createKey(signature: string, walletAddress: string){
    let headers = new HttpHeaders().set('authorization', `Bearer ${localStorage['accessToken']}`)
    return this.http.post(`${this.apiUrl}/user/createKey`, { walletAddress, signature }, { headers: headers })
      .pipe(
        tap(d => this.router.navigate(['/dashboard'])),
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
      this.router.navigate(['/dashboard']);else
    if ( status === -5 )
      this.changeBindStatus('err')
  }

  changeBindStatus(status: 'form'|'err'){
    this.$bindStatus.next(status)
  }
}
