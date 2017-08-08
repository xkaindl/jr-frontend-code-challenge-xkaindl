import {Component, DoCheck, Input, OnInit, Output} from '@angular/core';
import {Hotel} from '../../hotel.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {HotelService} from '../../hotel.service';
import {AuthService} from "../../../auth/auth.service";
import {isUndefined} from "util";

@Component({
  selector: 'app-hotel-item',
  templateUrl: './hotel-item.component.html',
  styleUrls: ['./hotel-item.component.scss']
})
export class HotelItemComponent implements OnInit {
   @Input() hotel: Hotel;
   @Input() index: number;
   @Input() listMode: false;
   showAlert = false;
   authorized = false;

  constructor(private hotelService: HotelService,
              private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.authorized = true;
    } else {
      this.authorized = false;
    }
  }

  onDeleteItem() {
    this.showAlert = true;
  }

  onEditItem() {
    this.router.navigate(['hotel/new/' + this.index], {relativeTo: this.route});
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  onDelete() {
    this.hotelService.deleteHotel(this.index);
  }

  onCancelDel() {
    this.showAlert = false;
  }
}
