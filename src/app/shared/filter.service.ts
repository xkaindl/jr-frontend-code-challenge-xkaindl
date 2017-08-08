import { Injectable } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Injectable()
export class FilterService {
  city: string;
  country: string;
  rooms: number;
  filterForm: FormGroup;

  constructor() { }
  setFilterParams(country: string, city: string, rooms: number) {
    this.country = country;
    this.city = city;
    this.rooms = rooms;
  }

  setFormGroup(hotelCity: string, hotelCountry: string, hotelRooms: number) {
    this.filterForm =  new FormGroup ({
      'city': new FormControl(hotelCity, Validators.required),
      'country': new FormControl(hotelCountry, Validators.required),
      'rooms': new FormControl(hotelRooms, [Validators.required, Validators.min(1)]),
    });
    return this.filterForm;
  }



}
