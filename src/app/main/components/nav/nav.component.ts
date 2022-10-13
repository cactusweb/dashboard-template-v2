import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/tools/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  siteUrl = environment.landing || environment.site
  logo = environment.logo

  constructor(
    public auth: AuthService
  ) { }

  ngOnInit(): void {
  }

}
