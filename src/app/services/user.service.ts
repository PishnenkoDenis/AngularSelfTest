import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  $user: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  addUser(user: any) {
    return this.httpClient
      .post(`${environment.BASE_URL}/users/add`, user)
      .subscribe((res: any) => {
        this.$user.next(res);
      });
  }
}
