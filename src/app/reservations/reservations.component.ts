import { Component, OnInit } from '@angular/core';
import {Hotel} from "../hotels/hotel.model";
import {HotelService} from "../hotels/hotel.service";
import {DataStorageService} from "../shared/data-storage.service";
import {Router} from "@angular/router";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements OnInit {
  hotels: Hotel[] = [];

  constructor(private hotelService: HotelService,
              protected authService: AuthService,
              private dataStorageService: DataStorageService,
              private router: Router) { }

  ngOnInit() {
    this.hotels = this.hotelService.getReservedHotels();
  }

  onUploadData() {
    this.dataStorageService.storeData(this.authService.getCurrentUserId())
      .subscribe(
        (response) => {
          console.log(response);
        }
      );
  }
  onDownloadData() {
    this.loadData();
  }

  private loadData(): void {
    this.dataStorageService.fetchData(this.authService.getCurrentUserId()).subscribe(
      (() => {
        this.hotels = this.hotelService.getReservedHotels();
      }).bind(this)
    );
  }
}
