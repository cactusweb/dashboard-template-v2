import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  ownerName = environment.ownerName;

  constructor(
    private title: Title,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  
  autoUpdateTags(){
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map((route) => {
        while (route.firstChild) route = route.firstChild;
        return route;
      }),
      filter((route) => route.outlet === 'primary'),
      mergeMap((route) => route.data)
     )
     .subscribe((event) => {
       this.changeTitle( event['title'] );
     }); 
  }

  
  changeTitle( title: string ){
    this.title.setTitle( this.ownerName + title);
  }
}
