import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { FormsModule } from '@angular/forms';
import { AuthRoutingModule } from '../auth/auth-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ResourcesModule } from './resources/resources.module';


@NgModule({
  declarations: [
    AdminHomeComponent
  ],
  imports: [
      CommonModule,
      FormsModule,
      AdminRoutingModule,
      SharedModule,
      ResourcesModule
    ]
})
export class AdminModule { }
