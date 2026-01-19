import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserHomeComponent } from './user-home/user-home.component';
import { ReservationDetailsComponent } from './reservations/reservation-details/reservation-details.component';
import { ReservationFormComponent } from './reservations/reservation-form/reservation-form.component';
import { ResourceDetailsComponent } from './resource-details/resource-details.component';
import { ReservationListComponent } from './reservations/reservation-list/reservation-list.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    children: [
      { path: 'user-home', component: UserHomeComponent },
      { path: 'reservations', component: ReservationListComponent },
      { path: 'reservations/new', component: ReservationFormComponent },
      { path: 'reservations/:id', component: ReservationDetailsComponent },
      { path: 'reservations/edit/:id', component: ReservationFormComponent },
      { path: 'resource-details/:id', component: ResourceDetailsComponent },
      { path: '', redirectTo: 'user-home', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {}
