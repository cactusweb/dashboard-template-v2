import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(
    private router: Router
  ) { }

  
  auth( redirectParam?: any ){
    if (!redirectParam)
      redirectParam = this.getCurrentRoute();

    redirectParam = JSON.stringify(redirectParam);
    localStorage.removeItem('accessToken');
    window.location.href = `${this.apiUrl}/auth?redirect_to=${redirectParam}`;
  }
  
  logout(){
    localStorage.removeItem( 'accessToken' );
    localStorage.removeItem( 'member' );

    window.location.href = environment.landing || environment.site
  }

  
  private getCurrentRoute(){
    let urlParams = this.router.parseUrl(this.router.url)
    let currentLink = urlParams.root.children['primary'] ? 
      urlParams.root.children['primary'].segments.map(it => it.path).join('/')
      :
      ''

    return {
      queryParams: urlParams.queryParams,
      link: `/${currentLink}`,
    };
  }
}
