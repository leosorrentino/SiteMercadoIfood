import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../userService';
import { User } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  userForm: FormGroup;
  user: User;
  errors: any[] = [];

  constructor(private fb: FormBuilder,
    private router: Router,
    private userService: UserService) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      username: '',
      password: ''
    });
  }
  login() {
    if (this.userForm.valid && this.userForm.dirty) {
      let _user = Object.assign({}, this.user, this.userForm.value);

      this.userService.login(_user)
        .subscribe(
          result => { this.onSaveComplete(result) }
        );
    }
  }
  onSaveComplete(response: any) {
    this.router.navigateByUrl('/lista-produtos');
  }
  onError(fail: any) {
    this.errors = fail.error.errors;
  }
}
