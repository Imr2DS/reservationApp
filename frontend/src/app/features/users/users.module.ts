import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { UsersRoutingModule } from './users-routing.module';
import { UserHomeComponent } from './user-home/user-home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReservationListComponent } from './reservations/reservation-list/reservation-list.component';
import { ReservationFormComponent } from './reservations/reservation-form/reservation-form.component';
import { ReservationDetailsComponent } from './reservations/reservation-details/reservation-details.component';
import { ResourceDetailsComponent } from './resource-details/resource-details.component';
import { UsersComponent } from './users/users.component';
import { MesReservationsComponent } from './mes-reservations/mes-reservations.component';


@NgModule({
  declarations: [
    UserHomeComponent,
    ReservationListComponent,
    ReservationFormComponent,
    ReservationDetailsComponent,
    ResourceDetailsComponent,
    UsersComponent,
    MesReservationsComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class UsersModule { }
