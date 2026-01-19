import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminHomeComponent } from './admin-home/admin-home.component';
import { ResourceFormComponent } from './resources/resource-form/resource-form.component';
import { ResourceDetailsComponent } from './resources/resource-details/resource-details.component';
import { ResourceStatsComponent } from './resources/resource-stats/resource-stats.component';

const routes: Routes = [
  { path: 'admin-home', component: AdminHomeComponent },

  // ROUTES RESSOURCES
  { path: 'new-resource', component: ResourceFormComponent },
  { path: 'edit-resource/:id', component: ResourceFormComponent },

  { path: 'resource-details/:id', component: ResourceDetailsComponent },
  { path: 'resource-stats/:id', component: ResourceStatsComponent },

  { path: '', redirectTo: 'admin-home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
