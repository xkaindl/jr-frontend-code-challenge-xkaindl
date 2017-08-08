import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {HotelService} from '../hotels/hotel.service';
import {Hotel} from "../hotels/hotel.model";
import 'rxjs/add/operator/do';
import {AuthService} from "../auth/auth.service";
@Injectable()
export class DataStorageService {

  constructor(private http: Http,
              private hotelService: HotelService,
              private authService: AuthService) {
  }


  storeData(id: string) {
    return this.http.put(
      `https://junior-frontend-code-challenge.firebaseio.com/reservedHotels${id}.json`,
      this.hotelService.getReservedHotels());
  }
  fetchData(id: string) {
    return this.http.get(
      `https://junior-frontend-code-challenge.firebaseio.com/reservedHotels${id}.json`)
      .do(
        (response) => {
          const reservedHotels: Hotel[] = response.json();
          this.hotelService.setReservedHotel(reservedHotels);
        }
      );
  }
}
