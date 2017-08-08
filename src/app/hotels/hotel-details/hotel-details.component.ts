import { Component, OnInit } from '@angular/core';
import {Hotel} from '../hotel.model';
import {HotelService} from '../hotel.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-hotel-details',
  templateUrl: './hotel-details.component.html',
  styleUrls: ['./hotel-details.component.scss']
})
export class HotelDetailsComponent implements OnInit {
  idx: number;
  hotel: Hotel;

  constructor(private hotelService: HotelService,
              protected authService: AuthService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe( (params: Params) => {
      this.idx = params['id'];
      this.hotel = this.hotelService.getHotelByIndex(this.idx);
    });
  }

  onReserveItem() {
    this.hotelService.reserveHotel(this.hotel);
  }
  onGoBack() {
    this.router.navigate(['hotels']);
  }
}
