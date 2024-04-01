import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IUser } from '../user-add/user-add.component';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent implements OnInit {
  @Input() user!: IUser;
  @Input() index: number | null = null;
  @Output() removeUser = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}

  remove(userId: number): void {
    this.removeUser.emit(userId);
  }
}
