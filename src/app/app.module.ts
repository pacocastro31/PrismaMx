import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { environment } from "../environments/environment";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CustomerDetailsComponent } from "./customers/customer-details/customer-details.component";
import { CustomerListComponent } from "./customers/customer-list/customer-list.component";
import { CreateCustomerComponent } from "./customers/create-customer/create-customer.component";
import { AdminComponent } from './admin/admin.component';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { TopbarComponent } from './topbar/topbar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { FooterComponent } from './footer/footer.component';

import { InPlaceEditorModule } from '@syncfusion/ej2-angular-inplace-editor';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { EditContactInfoComponent } from './admin/edit-info/edit-contact-info/edit-contact-info.component';
import { HomeBannerSliderComponent } from './admin/home-slider/home-banner-slider/home-banner-slider.component';
import { VerPedidosComponent } from './ver-pedidos/ver-pedidos.component';
import { HomeSliderListComponent } from './admin/home-slider/home-slider-list/home-slider-list.component';
import { HomeSliderDetailComponent } from './admin/home-slider/home-slider-detail/home-slider-detail.component';
import { CotizacionComponent } from './cotizacion/cotizacion/cotizacion.component';
//import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { ServiciosParte1Component } from './admin/serviciosParte1/servicios-parte1/servicios-parte1.component';
import { ServiciosParte1ListComponent } from './admin/serviciosParte1/servicios-parte1-list/servicios-parte1-list.component';
import { ServiciosParte1DetailComponent } from './admin/serviciosParte1/servicios-parte1-detail/servicios-parte1-detail.component';
import { PedidoComponent } from './dashboard/pedido/pedido.component';



@NgModule({
	declarations: [
		AppComponent,
		CustomerDetailsComponent,
		CustomerListComponent,
		CreateCustomerComponent,
		HomeComponent,
		TopbarComponent,
		NavbarComponent,
		ContactUsComponent,
		FooterComponent,
		DashboardComponent,
		AdminComponent,
		EditContactInfoComponent,
		HomeBannerSliderComponent,
		HomeSliderListComponent,
		HomeSliderDetailComponent,
		DashboardComponent,
		VerPedidosComponent,
		CotizacionComponent,
		//AlertModalComponent,
		ServiciosParte1Component,
		ServiciosParte1ListComponent,
		ServiciosParte1DetailComponent,
		PedidoComponent,
	],
	imports: [
		BrowserModule,
		FormsModule,
		AppRoutingModule,
		AngularFireModule.initializeApp(environment.firebase),
		AngularFireDatabaseModule,
		RouterModule.forRoot([]),
		InPlaceEditorModule,
		TextBoxModule,



	

	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
