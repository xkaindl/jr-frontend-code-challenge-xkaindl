import {Component, Input, OnInit} from '@angular/core';
import {HotelService} from '../../hotel.service';
import {Hotel} from '../../hotel.model';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from "../../../auth/auth.service";

@Component({
  selector: 'app-hotel-detailed-item',
  templateUrl: './hotel-detailed-item.component.html',
  styleUrls: ['./hotel-detailed-item.component.scss']
})
export class HotelDetailedItemComponent implements OnInit {
  @Input() hotel: Hotel;
  @Input() index: number;
  @Input() listMode: false;
  reservationMode = false;
  showAlert = false;
  constructor( private route: ActivatedRoute,
               private hotelService: HotelService) { }

  ngOnInit() {
    this.route.toString().includes('reservations') ? this.reservationMode = true : this.reservationMode = false;
  }
  onCancelReservation() {
    this.showAlert = true;
  }
  onDelete() {
    this.hotelService.deleteReservedHotel(this.index);
  }

  onCancelDel() {
    this.showAlert = false;
  }
}
