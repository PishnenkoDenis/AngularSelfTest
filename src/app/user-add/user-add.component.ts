import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Subject, takeUntil } from 'rxjs';

interface IUser {
  firstName: string;
  lastName: string;
  age: number;
}

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss'],
})
export class UserAddComponent implements OnInit, OnDestroy {
  userForm: FormGroup;
  user: IUser | null = null;
  private unsubscriber$ = new Subject<void>();
  constructor(private form: FormBuilder, private userService: UserService) {
    this.userForm = this.form.group({
      lastName: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      age: [null, [Validators.required, Validators.max(100)]],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.userForm.valid) {
      this.userService.addUser(this.userForm.value);
      this.userService.$user
        .pipe(takeUntil(this.unsubscriber$))
        .subscribe((value: any) => (this.user = value));
    }
  }

  onReset() {
    this.userForm.reset();
    this.user = null;
  }

  ngOnDestroy(): void {
    this.unsubscriber$.next();
    this.unsubscriber$.complete();
  }
}
