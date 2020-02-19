import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ComponentsModule } from './dashboard/components/components.module';
import { AdminLayoutComponent } from './dashboard/layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './dashboard/layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TestComponent } from './sharedComponent/test/test.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { UpdateCompanyComponent } from './dashboard/pages/companies/update-company/update-company.component';
import { AddInsuranceComponent } from './dashboard/pages/insurances/add-insurance/add-insurance.component';
import { UpdateInsuranceComponent } from './dashboard/pages/insurances/update-insurance/update-insurance.component';
import { ClientsComponent } from './dashboard/pages/clients/clients.component';
import { MedicsComponent } from './dashboard/pages/medics/medics.component';
import { AddClientComponent } from './dashboard/pages/clients/add-client/add-client.component';
import { UpdateClientComponent } from './dashboard/pages/clients/update-client/update-client.component';
import { AddCarsComponent } from './dashboard/pages/clients/add-cars/add-cars.component';
import { CarsComponent } from './dashboard/pages/clients/cars/cars.component';
import { InsuranceProfileComponent } from './dashboard/pages/insurance-profile/insurance-profile.component';
import { HomeComponent } from './dashboard/pages/home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    TestComponent,
    InsuranceProfileComponent,
    
  
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
