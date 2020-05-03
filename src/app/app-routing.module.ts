import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateCustomerComponent } from './customers/create-customer/create-customer.component';
import { CustomerListComponent } from './customers/customer-list/customer-list.component';
import { AdminComponent } from './admin/admin.component'; 
import { EditContactInfoComponent } from './admin/edit-info/edit-contact-info/edit-contact-info.component';
import { HomeBannerSliderComponent } from './admin/home-slider/home-banner-slider/home-banner-slider.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';


const routes: Routes = [
  { path: '', redirectTo: '/customers', pathMatch: 'full' },
  { path: 'customers', component: CustomerListComponent },
  { path: 'add', component: CreateCustomerComponent },
  { path: 'admin', component: AdminComponent},
  { path: 'admin/editContact', component: EditContactInfoComponent},
  { path: 'admin/homeSlider', component: HomeBannerSliderComponent}
  { path: 'dashboard', component: DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
