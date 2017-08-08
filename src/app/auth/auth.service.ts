import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {User} from "firebase/app";

@Injectable()
export class AuthService {
  token: string;
  error: string;

  constructor() { }

  signupUser(email: string, password: string) {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch(
        error => this.error = error.message
      );
  }

  signinUser(email: string, password: string): firebase.Promise<any> {
    return firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        response => {
          return firebase.auth().currentUser.getIdToken()
            .then(
            (token: string) => this.token = token
          )
        },
      ).catch(
        error => this.error = error.message
      )
  }

  getToken() {
    firebase.auth().currentUser.getIdToken()
      .then(
        (token: string) => this.token = token
      );
    return this.token;
  }

  getCurrentUser(): User {
    return firebase.auth().currentUser
  }

  getCurrentUserId(): string {
    const user = this.getCurrentUser();
    return user ? user.uid : undefined;
  }

  logout() {
    firebase.auth().signOut();
    this.token = null;
  }

  isAuthenticated() {
    return this.token != null;
  }
}
