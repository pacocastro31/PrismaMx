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
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';

import { InPlaceEditorModule } from '@syncfusion/ej2-angular-inplace-editor';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { EditContactInfoComponent } from './admin/edit-info/edit-contact-info/edit-contact-info.component';

@NgModule({
	declarations: [
		AppComponent,
		CustomerDetailsComponent,
		CustomerListComponent,
		CreateCustomerComponent,
		AdminComponent,
		EditContactInfoComponent,
	],
	imports: [
		BrowserModule,
		FormsModule,
		AppRoutingModule,
		AngularFireModule.initializeApp(environment.firebase),
		AngularFireDatabaseModule,
		RouterModule.forRoot([]),
		InPlaceEditorModule,
		TextBoxModule
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
