import {Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {FilterService} from '../shared/filter.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  searchForm: FormGroup;
  validSearch = false;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private filterService: FilterService) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    const hotelCountry = '';
    const hotelCity = '';
    const hotelRooms = 0;
    this.searchForm = this.filterService.setFormGroup(hotelCity, hotelCountry, hotelRooms);
  }

  onSearch() {
    const city = this.searchForm.get('city').value;
    const country = this.searchForm.get('country').value;
    const rooms = this.searchForm.get('rooms').value;
    this.filterService.setFilterParams(country, city, rooms);
    this.validSearch = true;
    this.searchForm.reset();
  }
}
