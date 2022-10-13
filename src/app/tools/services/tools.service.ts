import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {
  renderer: Renderer2

  constructor(
    private rendererFactory: RendererFactory2
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
    let wrapper = document.createElement('div')
    wrapper.classList.add('notification');
    wrapper.classList.add(`notification--${status}`);

    let p = document.createElement('p')
    p.classList.add('notification__text')

    p.innerHTML += text;

    let btn = document.createElement('button')
    btn.classList.add('notification__btn', 'btn')
    btn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
        <path d="M7.57982 0.420996C7.25535 0.0965287 6.72928 0.0965288 6.40482 0.420996L4.70776 2.11806C4.31723 2.50858 3.68407 2.50858 3.29354 2.11806L1.59648 0.420996C1.27202 0.0965289 0.745952 0.0965288 0.421484 0.420996C0.097017 0.745463 0.0970171 1.27153 0.421484 1.596L2.11854 3.29306C2.50907 3.68358 2.50907 4.31675 2.11854 4.70727L0.421485 6.40433C0.0970172 6.7288 0.097017 7.25486 0.421484 7.57933C0.745952 7.9038 1.27202 7.9038 1.59648 7.57933L3.29354 5.88227C3.68407 5.49174 4.31723 5.49174 4.70776 5.88227L6.40482 7.57933C6.72928 7.9038 7.25535 7.9038 7.57982 7.57933C7.90428 7.25486 7.90428 6.7288 7.57982 6.40433L5.88276 4.70727C5.49223 4.31675 5.49223 3.68358 5.88276 3.29306L7.57982 1.596C7.90428 1.27153 7.90428 0.745463 7.57982 0.420996Z" fill="white"/>
      </svg>
    `

    let listener = this.renderer.listen(btn, 'click', () => this.hideNotif(wrapper, listener))

    
    wrapper.appendChild(p)
    wrapper.appendChild(btn)


    let notifBlock = document.querySelector('#notifications-block')

    notifBlock?.appendChild( wrapper );
    setTimeout(() => {
      wrapper.classList.add('notification--show')
    }, 20);

    setTimeout(() => {
      this.hideNotif(wrapper, listener)
    }, 3800);
  }

  private hideNotif( wrapper: HTMLElement, listener: () => void ){
    listener();
    wrapper.classList.remove('notification--show')

    setTimeout(() => {
      wrapper.remove();
    }, 300);
  }


  capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  
  public removeNotifications(){
    document.querySelectorAll('#notifications-block .notification').forEach( n => n.remove())
  }
}
