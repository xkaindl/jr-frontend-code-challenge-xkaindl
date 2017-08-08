import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HotelsComponent } from './hotels/hotels.component';
import { HotelDetailsComponent } from './hotels/hotel-details/hotel-details.component';
import { ReservationsComponent } from './reservations/reservations.component';
import {AppRoutingModule} from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HotelItemComponent } from './hotels/hotel-lists/hotel-item/hotel-item.component';
import { HotelListComponent } from './hotels/hotel-lists/hotel-list/hotel-list.component';
import {HotelService} from './hotels/hotel.service';
import { FilteredHotelListComponent } from './hotels/hotel-lists/filtered-hotel-list/filtered-hotel-list.component';
import {FilterService} from './shared/filter.service';
import { HotelEditComponent } from './hotels/hotel-edit/hotel-edit.component';
import { HotelFilterComponent } from './hotels/hotel-filter/hotel-filter.component';
import { HotelDetailedItemComponent } from './hotels/hotel-lists/hotel-detailed-item/hotel-detailed-item.component';
import {HttpModule} from '@angular/http';
import {DataStorageService} from './shared/data-storage.service';

import { SigninComponent } from './auth/signin/signin.component';
import {AuthService} from './auth/auth.service';
import { SignupComponent } from './auth/signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HotelsComponent,
    HotelDetailsComponent,
    ReservationsComponent,
    HeaderComponent,
    HotelItemComponent,
    HotelListComponent,
    FilteredHotelListComponent,
    HotelEditComponent,
    HotelFilterComponent,
    HotelDetailedItemComponent,
    SigninComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpModule,
    FormsModule
  ],
  providers: [HotelService, FilterService, DataStorageService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
