import { Component, OnDestroy } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToolsService } from 'src/app/tools/services/tools.service';

@Component({
  selector: 'app-router-loader',
  templateUrl: './router-loader.component.html',
  styleUrls: ['./router-loader.component.scss']
})
export class RouterLoaderComponent implements OnDestroy {
  sub!: Subscription;
  show: boolean = false;

  constructor(
    private router: Router,
    private tools: ToolsService
  ) {
    this.listenRouteLoading();
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe()
  }

  
  listenRouteLoading(){
    this.sub = this.router.events.subscribe(event => {
      if ( event instanceof NavigationStart ) this.show = true; else
      if ( this.show == false ) return; else
      if ( event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError ) this.show = false;

      if ( event instanceof NavigationError ){
        this.tools.generateNotification( 'Failed to load page' )
      }
    });
  }

}
