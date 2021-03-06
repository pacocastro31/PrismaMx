import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateCustomerComponent } from './customers/create-customer/create-customer.component';
import { CustomerListComponent } from './customers/customer-list/customer-list.component';
import { AdminComponent } from './admin/admin.component';
import { EditContactInfoComponent } from './admin/edit-info/edit-contact-info/edit-contact-info.component';
import { HomeBannerSliderComponent } from './admin/home-slider/home-banner-slider/home-banner-slider.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { CotizacionComponent } from './cotizacion/cotizacion/cotizacion.component';
import { VerPedidosComponent } from './ver-pedidos/ver-pedidos.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'customers', component: CustomerListComponent },
  { path: 'home', component: HomeComponent },
  { path: 'add', component: CreateCustomerComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'mis-pedidos', component: VerPedidosComponent },
  { path: 'cotizacion', component: CotizacionComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
