import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, filter, switchMap, take } from 'rxjs';
import { IUser } from '../user-add/user-add.component';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}
  $users: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);
  $user: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  users: IUser[] = [];

  addUser(user: any) {
    return this.httpClient
      .post(`${environment.BASE_URL}/users/add`, user)
      .subscribe((res: any) => {
        this.$user.next(res);
      });
  }

  getAllUsers() {
    this.httpClient
      .get(`${environment.BASE_URL}/users`)
      .subscribe((res: any) => {
        this.$users.next(res.users);
        this.users = res.users;
      });
  }

  removeUser(id: number) {
    return this.$users.next(this.users.filter((user) => user.id !== id));
  }
}
