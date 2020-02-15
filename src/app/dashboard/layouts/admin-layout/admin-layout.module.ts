import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CompaniesComponent } from '../../pages/companies/companies.component';
import { AddCompanyComponent } from '../../pages/companies/add-company/add-company.component';
import { UpdateCompanyComponent } from '../../pages/companies/update-company/update-company.component';
import { InsurancesComponent } from '../../pages/insurances/insurances.component';
import { UpdateInsuranceComponent } from '../../pages/insurances/update-insurance/update-insurance.component';
import { AddInsuranceComponent } from '../../pages/insurances/add-insurance/add-insurance.component';
import { UpdateClientComponent } from '../../pages/clients/update-client/update-client.component';
import { AddClientComponent } from '../../pages/clients/add-client/add-client.component';
import { MedicsComponent } from '../../pages/medics/medics.component';
import { ClientsComponent } from '../../pages/clients/clients.component';
import { AddCarsComponent } from '../../pages/clients/add-cars/add-cars.component';
import { LoginComponent } from '../../pages/login/login.component';
import { CarsComponent } from '../../pages/clients/cars/cars.component';
import { ClientCarsComponent } from '../../pages/client-cars/client-cars.component';
import { AddDriverComponent } from '../../pages/client-cars/add-driver/add-driver.component';
import { DetailsComponent } from '../../pages/client-cars/details/details.component';
// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TablesComponent,
    IconsComponent,
    MapsComponent,
    CompaniesComponent,
    AddCompanyComponent,
    UpdateCompanyComponent,
    InsurancesComponent,
    AddInsuranceComponent,
    UpdateInsuranceComponent, 
    ClientsComponent,
    MedicsComponent,
    AddClientComponent,
    UpdateClientComponent,
    AddCarsComponent,
    CarsComponent,
    ClientCarsComponent,
    AddDriverComponent,
    DetailsComponent,


    
  ]
})

export class AdminLayoutModule {}
