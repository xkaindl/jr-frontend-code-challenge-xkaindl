import {Component, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {HotelService} from '../../hotel.service';
import {Hotel} from 'app/hotels/hotel.model';
import {ActivatedRoute, Router} from '@angular/router';
import {FormGroup} from "@angular/forms";
import {FilterService} from "../../../shared/filter.service";
import {AuthService} from "../../../auth/auth.service";

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.scss']
})
export class HotelListComponent implements OnInit, OnDestroy {
  hotels: Hotel[];
  subscription: Subscription;
  filteredHotel: string;

  constructor(private hotelService: HotelService,
              protected authService: AuthService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.subscription = this.hotelService.hotelsChanged.subscribe(
      (hotels: Hotel[]) => {
        this.hotels = hotels;
      }
    );
    this.hotels = this.hotelService.getHotels();
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onAddHotel() {
    this.router.navigate(['hotel/new'], {relativeTo: this.route});
    document.body.scrollTop = document.documentElement.scrollTop = 0;

  }

  onSearchHotel() {
    this.router.navigate(['search'], {relativeTo: this.route});
    document.body.scrollTop = document.documentElement.scrollTop = 0;

  }


}
