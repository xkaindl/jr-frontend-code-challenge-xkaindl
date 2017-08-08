import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  error = false;

  constructor(protected authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
  }

  onSignup(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.authService.signupUser(email, password).then(
      () => {
        this.authService.signinUser(email, password).then(
          (() => {
            if (this.authService.isAuthenticated()) {
              this.router.navigate(['hotels']);
            } else {
              this.error = true;
            }
          }).bind(this)
        );
      }
    );
  }

}
