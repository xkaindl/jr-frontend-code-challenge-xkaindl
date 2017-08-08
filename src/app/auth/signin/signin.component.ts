import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  error = false;

  constructor(protected authService: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  onSignin(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.authService.signinUser(email, password).then(
      (() => {
        if (this.authService.isAuthenticated()) {
          this.router.navigate(['hotels']);
        } else {
          this.error = true;
        }
      }).bind(this)
    );
    // this.authService.isAuthenticated() ? this.router.navigate(['hotels']) : this.error = true ;
  }

}