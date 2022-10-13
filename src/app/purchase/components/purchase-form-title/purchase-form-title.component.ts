import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from 'src/app/tools/interfaces/user';
import { DropService } from '../../services/drop.service';

@Component({
  selector: 'purchase-form-title',
  templateUrl: './purchase-form-title.component.html',
  styleUrls: ['./purchase-form-title.component.scss']
})
export class PurchaseFormTitleComponent implements OnInit {
  inviter: Observable<User|null>

  constructor(
    private drop: DropService
  ) {
    this.inviter = this.drop.getDrop()
      .pipe(
        map(d => d?.inviter || null)
      )
  }

  ngOnInit(): void {
  }

}
