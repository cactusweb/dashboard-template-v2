import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, filter, finalize, Observable, take, tap, throwError } from 'rxjs';
import { Requests } from 'src/app/const';
import { User } from '../interfaces/user';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user!: User
  private $user = new BehaviorSubject<User|null>(null);

  private loading: boolean = false;

  constructor(
    private http: HttpService
  ) { }


  public getUser( update: boolean = false ): Observable<User>{
    if ( (update || !this.user) && !this.loading ){
      this.loading = true;
      this.fetchUser()
        .pipe(
          take(1),
          finalize(() => this.loading = false)
        )
        .subscribe({ next: () => {}, error: () => {} })
    }

    // @ts-ignore
    return this.$user.asObservable()
      .pipe(
        filter(u => !!u)
      )
  }

  
  private fetchUser(): Observable<User>{
    return this.http.request( Requests['getUser'] )
      .pipe(
        tap(d => {
          this.user = d
          this.$user.next(this.user)
        }),
        // catchError(err => {
        //   // if ( !this.user ){
        //     // this.$user.error(err);
        //     // this.$user = new BehaviorSubject<User|null>(null)
        //   // }

        //   return throwError(err)
        // })
      )
  }
}
