import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { DropService } from '../../services/drop.service';

interface Price{
  currency: string,
  price: number,
  rubPrice: number,
}

@Component({
  selector: 'currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss']
})
export class CurrencyConverterComponent implements OnInit {
  priceData!: Observable<Price>

  constructor(
    private drop: DropService
  ) {
    this.priceData = this.drop.getDrop()
      .pipe(
        map(d => {
          return {
            price: d.price,
            rubPrice: d.to_rub,
            currency: d.currency
          }
        })
      )
  }

  ngOnInit(): void {
  }

}
