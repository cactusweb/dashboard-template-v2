import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
    localStorage['accessToken'] = this.activatedRoute.snapshot.queryParams['accessToken']
    this.router.navigate(['/bind']);
  }

}
