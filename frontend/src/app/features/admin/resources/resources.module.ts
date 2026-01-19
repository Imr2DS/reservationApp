import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResourceFormComponent } from './resource-form/resource-form.component';
import { ResourceDetailsComponent } from './resource-details/resource-details.component';
import { ResourceStatsComponent } from './resource-stats/resource-stats.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ResourceFormComponent,
    ResourceDetailsComponent,
    ResourceStatsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ResourcesModule { }
