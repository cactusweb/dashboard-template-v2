import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { NotificationsService } from 'src/app/notifications/services/notifications.service';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {
  renderer: Renderer2

  constructor(
    private rendererFactory: RendererFactory2,
    private notifications: NotificationsService
  ) { 
    this.renderer = rendererFactory.createRenderer(null,null)
  }

  
  public copy( data: string, notifText: string = 'Copied!' ){
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = data;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.generateNotification(notifText, "primary");
  }

  
  generateNotification( text: string, status: 'primary' | 'success' | 'err' = 'err' ){
    this.notifications.create({text, type: status})
  }


  capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  
}
