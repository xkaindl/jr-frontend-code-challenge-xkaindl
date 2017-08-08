import {Injectable, OnInit} from '@angular/core';
import {Hotel} from './hotel.model';
import {Subject} from 'rxjs/Subject';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from "../auth/auth.service";
import {User} from "firebase/app";

@Injectable()
export class HotelService {

  private hotels: Hotel[] = [
    new Hotel('Sunrise', 'Brasil', 'Rio de Janeiro', 20, ['free Dinner', 'Soccer camp', 'View on the sea']),
    new Hotel('Palmtree', 'Kuba', 'Havanna', 20, ['free Dinner', 'Tobacco Tour', 'View on the sea']),
    new Hotel('Enjoy', 'Austria', 'Ried im Innkreis', 20, ['free Lunch', 'Schwanthaler memorial', 'View on the landscape']),
    new Hotel('Relax', 'Turky', 'Ankara', 20, ['free Breakfast', 'Bazar', 'View on the sea']),
    new Hotel('Reload', 'Chile', 'Santiago de Chile', 20, ['free Dinner', 'Hitchhiking', 'View on the sea']),
    new Hotel('Dreambeach', 'Croatia', 'Split', 20, ['free Lunch', 'Zoo', 'View on the sea']),
    new Hotel('Exotic', 'Australia', 'Sydney', 20, ['free Breakfast', 'Massage', 'View on the sea']),
    new Hotel('Hilton', 'Austria', 'Vienna', 20, ['free Dinner', 'Nail saloon', 'View on Stephansdom']),
    new Hotel('Palace', 'Portugal', 'Porto', 20, ['free Lunch', 'Chill out Area', 'View on the sea'])
  ];
  hotelsChanged = new Subject<Hotel[]>();
  reservedHotels = new Map<string, Hotel[]>();



  constructor(private router: Router,
              private authService: AuthService,
              private route: ActivatedRoute) {
  }

  getHotels() {
    return this.hotels;
  }

  addHotel(hotel: Hotel) {
    this.hotels.push(hotel);
    this.hotelsChanged.next(this.hotels.slice());
  }

  deleteHotel(idx: number) {
    this.hotels.splice(idx, 1);
    this.hotelsChanged.next(this.hotels.slice());
    this.router.navigate(['hotels'], {relativeTo: this.route});
  }

  updateHotel(hotel: Hotel, idx: number) {
    this.hotels[idx] = hotel;
  }

  reserveHotel(hotel: Hotel) {
    let add = true;
    const userId = this.authService.getCurrentUserId();
    const reservations = this.reservedHotels.get(userId);
    if (reservations && reservations.length > 0) {
      for (const reservedHotel of reservations) {
        if (reservedHotel.name === hotel.name) {
          add = false;
          this.reservedHotels[reservations.indexOf(hotel)] = hotel;
          this.hotelsChanged.next(reservations.slice());
        }
      }
    }
    if (add) {
      if (!this.reservedHotels.has(userId)) {
        this.reservedHotels.set(userId, []);
      }
      this.reservedHotels.get(userId).push(hotel);
      this.hotelsChanged.next(this.reservedHotels.get(userId).slice());
    }
  }
  deleteReservedHotel(idx: number) {
    const userId = this.authService.getCurrentUserId();
    this.reservedHotels.get(userId).splice(idx, 1);
    this.hotelsChanged.next(this.reservedHotels.get(userId).slice());
  }

  getReservedHotels() {
    const userId = this.authService.getCurrentUserId();
    console.log(this.reservedHotels.get(userId));
    const hotels = this.reservedHotels.get(userId);
    return hotels ? hotels : [];
  }

  setReservedHotel(resHotels: Hotel[]) {
    const userId = this.authService.getCurrentUserId();
    this.reservedHotels.set(userId, resHotels);
  }

  getHotelByIndex(idx: number) {
    return this.hotels[idx];
  }
}
