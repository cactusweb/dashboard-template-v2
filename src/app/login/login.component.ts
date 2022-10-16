import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

interface RedirectData{
  link: string,
  queryParams: Record<any,any>
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.setAccessToken();
  }

  setAccessToken(){
    let queryParams = this.activatedRoute.snapshot.queryParams;
    localStorage['accessToken'] = queryParams['accessToken'];
    let redirectData: RedirectData = this.getRedirectData(queryParams)[0]
    this.router.navigate([redirectData.link], { queryParams: redirectData.queryParams });
  }

  getRedirectData( queryParams: Record<any,any> ): [RedirectData]{
    if ( queryParams['redirect_to'] )
      return JSON.parse(queryParams['redirect_to'])

    return [{ link: `/bind`, queryParams: {} }]
  }

}
