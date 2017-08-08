import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {HotelsComponent} from './hotels/hotels.component';
import {HotelDetailsComponent} from './hotels/hotel-details/hotel-details.component';
import {ReservationsComponent} from './reservations/reservations.component';
import {HotelEditComponent} from 'app/hotels/hotel-edit/hotel-edit.component';
import {HotelFilterComponent} from './hotels/hotel-filter/hotel-filter.component';
import {SigninComponent} from "./auth/signin/signin.component";
import {SignupComponent} from "./auth/signup/signup.component";

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: 'hotels', component: HotelsComponent, children: [
    {path: 'hotel/new', component: HotelEditComponent},
    {path: 'hotel/new/:id', component: HotelEditComponent},
    {path: 'search', component: HotelFilterComponent}
  ]
  },
  {path: 'details/:id', component: HotelDetailsComponent},
  {path: 'reservations', component: ReservationsComponent},
  {path: 'login', component: SigninComponent},
  {path: 'register', component: SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
