import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {Hotel} from '../../hotel.model';
import {HotelService} from '../../hotel.service';
import {FilterService} from "../../../shared/filter.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-filtered-hotel-list',
  templateUrl: './filtered-hotel-list.component.html',
  styleUrls: ['./filtered-hotel-list.component.css']
})
export class FilteredHotelListComponent implements OnInit {
  city: string;
  country: string;
  rooms: number;
  hotels: Hotel[] = [];
  subscription: Subscription;

  constructor(private hotelService: HotelService,
              private router: Router) { }

  ngOnInit() {
    /*
    */
  }
  cancel() {
    this.router.navigate(['hotels'])
  }

  search() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.subscription = this.hotelService.hotelsChanged.subscribe(
      (hotels: Hotel[]) => {
        for (const hotel of hotels) {
          if (hotel.city === this.city && hotel.country === this.country && hotel.rooms > this.rooms) {
            this.hotels.push(hotel);
          }
        }
      }
    );
    for (const hotel of this.hotelService.getHotels()) {
      if (hotel.city === this.city && hotel.country === this.country && hotel.rooms > this.rooms) {
        this.hotels.push(hotel);
      }
    }
  }
}
