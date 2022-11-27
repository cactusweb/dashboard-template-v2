import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Order } from '../interfaces/order';

interface InpData{
  name: string,
  dropKey?: string[],
  value?: any
}

@Injectable({
  providedIn: 'root'
})
export class TinkoffService {
  inpDatas: InpData[] = 
  [
    { name: 'terminalkey', dropKey: ['tinkoff', 'terminalKey'] },
    { name: 'order', dropKey: ['id'] },
    { name: 'amount', dropKey: ['to_rub'] },
    { name: 'frame', value: environment.paymentInFrame === false ? 'false' : 'true' },
    { name: 'reccurentPayment', value: 'true' },
    { name: 'description', dropKey: ['description'] },
    { name: 'language', value: 'en' },
    { name: 'receipt', dropKey: ['Receipt'] },
    { name: 'customerKey', dropKey: ['user'] },
    { name: 'email' }
  ]
  
  constructor() { }


  getForm( drop: Order, email: string, isBinding: boolean = false ){
    drop.Receipt['Email'] = email;
    this.inpDatas[9].value = email
    
    if ( isBinding )
      this.inpDatas[3].value = 'false';

    let form = document.createElement('form')
    form.name = 'TinkoffPayForm';
    this.inpDatas.forEach(d => 
      form.appendChild(
        this.getInput(d.name, this.getValue(drop, d))
      )
    )

    return form;
  }

  private getInput( name: string, value: any ){
    let inp = document.createElement('input')
    inp.classList.add('tinkoffPayRow')
    inp.name = name;
    if ( typeof value == 'object' ) value = JSON.stringify(value);
    inp.setAttribute('value', value);
    return inp;
  }

  private getValue( drop: any, inp: InpData ): any{
    let value: any;

    if ( inp.value ) value = inp.value;

    else if ( inp.dropKey )
      for ( let j = 0; j < inp.dropKey.length; j++ ){
        if ( j > 0 && !value ) break;
        if ( j == 0 ) value = drop[inp.dropKey[j]]
        else value = value[inp.dropKey[j]]
      }
    return value;
  }
}
