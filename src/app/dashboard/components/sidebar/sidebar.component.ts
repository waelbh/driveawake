import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
 
    { path: '/companies', title: 'Companies',  icon:'ni-bullet-list-67 text-red', class: '' },
    { path: '/insurances', title: 'Insurances',  icon:'ni-tv-2 text-primary', class: '' },
   

];

export const ROUTESCompany: RouteInfo[] = [
  { path: '/insurances', title: 'Insurances',  icon:'ni-bullet-list-67 text-red', class: '' },
  { path: '/clients', title: 'Clients',  icon:'ni-bullet-list-67 text-red', class: '' },
 

];

export const ROUTESClient: RouteInfo[] = [
 
  { path: '/clientCars', title: 'Cars',  icon:'ni-bullet-list-67 text-red', class: '' },
  { path: '/profile', title: 'Profile',  icon:'ni-single-02 text-red', class: '' },

];
export const ROUTESAssurance: RouteInfo[] = [
 
  { path: '/InsuranceClients', title: 'Clients',  icon:'ni-bullet-list-67 text-red', class: '' },
  { path: '/InsuranceProfile', title: 'Profile',  icon:'ni-single-02 text-red', class: '' },

 

];
export const ROUTESIntervenantMedicale: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
  { path: '/MedicPatients', title: 'Patients',  icon:'ni-bullet-list-67 text-red', class: '' },
  { path: '/MedicProfile', title: 'Profile',  icon:'ni-single-02 text-red', class: '' },

];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;
  public user:any[]=[];
  constructor(private router: Router) {
     
   }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log(this.user[0].role)
    if(this.user[0].role === "company"){
      this.menuItems = ROUTESCompany.filter(menuItem => menuItem);
      this.router.events.subscribe((event) => {
        this.isCollapsed = true;
     });
    }
    else if(this.user[0].role== "client"){
      this.menuItems = ROUTESClient.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
    }
    else if (this.user[0].role== "assurance"){
      this.menuItems = ROUTESAssurance.filter(menuItem => menuItem);
      this.router.events.subscribe((event) => {
        this.isCollapsed = true;
     });
    }
    else if (this.user[0].role == "intervenantMedical"){
      this.menuItems = ROUTESIntervenantMedicale.filter(menuItem => menuItem);
      this.router.events.subscribe((event) => {
        this.isCollapsed = true;
     });
    }else {
      this.menuItems = ROUTES.filter(menuItem => menuItem);
      this.router.events.subscribe((event) => {
        this.isCollapsed = true;
     });
    }
   
  }
}
