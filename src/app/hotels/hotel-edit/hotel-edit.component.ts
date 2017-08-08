import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {HotelService} from '../hotel.service';
import {Hotel} from '../hotel.model';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-hotel-edit',
  templateUrl: './hotel-edit.component.html',
  styleUrls: ['./hotel-edit.component.scss']
})
export class HotelEditComponent implements OnInit {
  editForm: FormGroup;
  editMode = false;
  idx: number;

  constructor(private hotelService: HotelService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.idx = params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    )
  }

  initForm() {
    let hotelName = '';
    let hotelCountry = '';
    let hotelCity = '';
    let hotelRooms = 1;
    const hotelFacilities = new FormArray([]);
    if (this.editMode) {
      const hotel = this.hotelService.getHotelByIndex(this.idx);
      hotelName = hotel.name;
      hotelCountry = hotel.country;
      hotelCity = hotel.city;
      hotelRooms = hotel.rooms;
      if (hotel['facilities']) {
        for (let i = 0; i < hotel['facilities'].length; i++) {
          hotelFacilities.push(
            new FormGroup({
              'facility': new FormControl(hotel.facilities[i], Validators.required)
            })
          );
        }
      }
    }
    this.editForm = new FormGroup({
      'name': new FormControl(hotelName, Validators.required),
      'city': new FormControl(hotelCity, Validators.required),
      'country': new FormControl(hotelCountry, Validators.required),
      'rooms': new FormControl(hotelRooms, [Validators.required, Validators.min(1)]),
      'facilities': hotelFacilities
    });
  }

  onSubmit() {
    const name = this.editForm.get('name').value;
    const city = this.editForm.get('city').value;
    const country = this.editForm.get('country').value;
    const rooms = this.editForm.get('rooms').value;
    const facilityValues = this.editForm.get('facilities').value;
    const facilities = facilityValues.map((value) => value.facility);
    if (this.editMode) {
      this.hotelService.updateHotel(new Hotel(name, country, city, rooms, facilities), this.idx);
    } else {
      this.hotelService.addHotel(new Hotel(name, country, city, rooms, facilities));
    }
    this.editForm.reset();
    this.router.navigate(['hotels']);
  }
  onDelFacility(idx: number) {
    (<FormArray>this.editForm.get('facilities')).removeAt(idx);
  }

  onAddFacility() {
    (<FormArray>this.editForm.get('facilities')).push(
      new FormGroup({
        'facility': new FormControl(null, Validators.required),
      })
    );
  }

  onCancel() {
    this.router.navigate(['hotels']);
  }

}
