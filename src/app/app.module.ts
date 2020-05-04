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
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TopbarComponent } from './topbar/topbar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';

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
	],
	imports: [
		BrowserModule,
		FormsModule,
		AppRoutingModule,
		AngularFireModule.initializeApp(environment.firebase),
		AngularFireDatabaseModule,
		RouterModule.forRoot([])
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
