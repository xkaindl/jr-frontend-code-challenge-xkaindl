import { Component, OnInit } from '@angular/core';
import {FormGroup} from "@angular/forms";
import {FilterService} from "../../shared/filter.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-hotel-filter',
  templateUrl: './hotel-filter.component.html',
  styleUrls: ['./hotel-filter.component.scss']
})
export class HotelFilterComponent implements OnInit {
  searchForm: FormGroup;

  constructor(private filterService: FilterService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }
  initForm() {
    const hotelCountry = '';
    const hotelCity = '';
    const hotelRooms = 0;
    this.searchForm = this.filterService.setFormGroup(hotelCity, hotelCountry, hotelRooms);
  }
  onUp() {
   this.router.navigate(['hotels'])
  }
}
