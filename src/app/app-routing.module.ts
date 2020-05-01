import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateCustomerComponent } from './customers/create-customer/create-customer.component';
import { CustomerListComponent } from './customers/customer-list/customer-list.component';
import { AdminComponent } from './admin/admin.component'; 
import { EditContactInfoComponent } from './admin/edit-info/edit-contact-info/edit-contact-info.component'


const routes: Routes = [
  { path: '', redirectTo: '/customers', pathMatch: 'full' },
  { path: 'customers', component: CustomerListComponent },
  { path: 'add', component: CreateCustomerComponent },
  { path: 'admin', component: AdminComponent},
  { path: 'admin/editContact', component: EditContactInfoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
