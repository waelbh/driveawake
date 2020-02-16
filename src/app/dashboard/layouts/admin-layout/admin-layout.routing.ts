import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { CompaniesComponent } from '../../pages/companies/companies.component';
import { InsurancesComponent } from '../../pages/insurances/insurances.component';
import { ClientsComponent } from '../../pages/clients/clients.component';
import { MedicsComponent } from '../../pages/medics/medics.component';
import { LoginComponent } from '../../pages/login/login.component';
import { CarsComponent } from '../../pages/clients/cars/cars.component';
import { ClientCarsComponent } from '../../pages/client-cars/client-cars.component';
import { DetailsComponent } from '../../pages/client-cars/details/details.component';
import { ClientsProfileComponent } from '../../pages/clients-profile/clients-profile.component';
import { InsuranceProfileComponent } from '../../pages/insurance-profile/insurance-profile.component';
import { MedicProfileComponent } from '../../pages/medic-profile/medic-profile.component';
import { MedicPatientsComponent } from '../../pages/medic-patients/medic-patients.component';
import { MedicPatientCarsComponent } from '../../pages/medic-patient-cars/medic-patient-cars.component';
import { MedicPatientDetailsComponent } from '../../pages/medic-patient-details/medic-patient-details.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'cars/:id', component: CarsComponent},
    { path: 'details/:ref', component: DetailsComponent},
    { path: 'PatientCardetails/:ref/:id', component: MedicPatientDetailsComponent},
    { path: 'PatientCars/:id', component: MedicPatientCarsComponent},
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'profile',   component: ClientsProfileComponent },
    { path: 'InsuranceProfile',   component: InsuranceProfileComponent },
    { path: 'MedicProfile',   component: MedicProfileComponent },
    { path: 'MedicPatients',   component: MedicPatientsComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'companies',         component: CompaniesComponent },
    { path: 'insurances',         component: InsurancesComponent },
    { path: 'clients',         component: ClientsComponent },
    { path: 'clientCars',         component: ClientCarsComponent },
    { path: 'medics',         component: MedicsComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent }
];
