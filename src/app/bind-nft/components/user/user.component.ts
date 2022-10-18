import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/tools/interfaces/user';
import { UserService } from 'src/app/tools/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  user!: Observable<User>

  constructor(
    private uService: UserService
  ) {
  }

  ngOnInit(): void {
    this.user = this.uService.getUser();
  }

}
