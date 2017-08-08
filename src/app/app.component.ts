import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';

  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyC6TmhqRxVJOJYt3exvNKZ-0R6VzQkzW-M',
      authDomain: 'junior-frontend-code-challenge.firebaseapp.com',
    });
  }
}
