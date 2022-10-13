import { AfterContentInit, Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ReferralPrize } from '../../interfaces/referral-prize';
import { LicenseService } from '../../services/license.service';

@Component({
  selector: 'referral-gifts',
  templateUrl: './referral-gifts.component.html',
  styleUrls: ['./referral-gifts.component.scss'],
})
export class ReferralGiftsComponent implements OnInit, AfterContentInit {
  prizes!: Observable<ReferralPrize[]>;
  active: boolean = false;

  constructor(
    private lic: LicenseService,
    private eRef: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.getPrizes();
  }

  ngAfterContentInit(): void {
    this.setLabelWidth();
  }

  getPrizes(){
    this.prizes = this.lic.getReferral()
      .pipe(
        tap(d => setTimeout(() => this.setLabelWidth(), 10))
      )
  }

  getValidLabel( num: number ): string{
    if ( num == 1 || num == 0 ) return 'Ref'
    else return 'Refs'
  }


  setLabelWidth(){
    if ( !this.eRef ) return
    let labels: HTMLElement[] = this.eRef.nativeElement.querySelectorAll('.gift__score')
    let maxWidth: number = 0;
    
    labels.forEach(l => {
      if ( l.offsetWidth > maxWidth )
        maxWidth = l.offsetWidth
    })

    labels.forEach(l => {
      console.log( maxWidth, l )
      this.renderer.setStyle(l, 'width', `${maxWidth}px`)
    })
  }

}
