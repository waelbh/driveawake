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

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'cars/:id', component: CarsComponent},
    { path: 'details/:ref', component: DetailsComponent},
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'companies',         component: CompaniesComponent },
    { path: 'insurances',         component: InsurancesComponent },
    { path: 'clients',         component: ClientsComponent },
    { path: 'clientCars',         component: ClientCarsComponent },
    { path: 'medics',         component: MedicsComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent }
];
