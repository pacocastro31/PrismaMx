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

@NgModule({
	declarations: [
		AppComponent,
		CustomerDetailsComponent,
		CustomerListComponent,
		CreateCustomerComponent,
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
