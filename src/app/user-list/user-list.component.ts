import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { IUser } from '../user-add/user-add.component';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit, OnDestroy {
  users: IUser[] = [];
  unsubscriber$ = new Subject<void>();
  isError = false;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getAllUsers();
    this.userService.$users.pipe(takeUntil(this.unsubscriber$)).subscribe(
      (value) => (this.users = value),
      (err) => {
        this.isError = true;
      }
    );
  }

  onRemoveUser(id: number) {
    console.log(id);
    this.userService.removeUser(id);
  }

  ngOnDestroy(): void {
    this.unsubscriber$.next();
    this.unsubscriber$.complete();
    this.isError = false;
  }
}
