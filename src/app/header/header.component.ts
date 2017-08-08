import {Component, DoCheck} from '@angular/core';
import {HotelService} from '../hotels/hotel.service';
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements  DoCheck {
  reservedHotels: number;

  constructor(private hotelService: HotelService,
              protected authService: AuthService,
              private router: Router) { }

  ngDoCheck() {
    const userId = this.authService.getCurrentUserId();
    if (this.hotelService.reservedHotels.get(userId) === undefined) {
      this.reservedHotels = 0;
    } else {
      this.reservedHotels = this.hotelService.reservedHotels.get(userId).length;
    }
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['']);
  }
  onLogin() {
    this.router.navigate(['login']);
  }

}
