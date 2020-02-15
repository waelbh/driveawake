import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/companies', title: 'Companies',  icon:'ni-bullet-list-67 text-red', class: '' },
    { path: '/insurances', title: 'Insurances',  icon:'ni-bullet-list-67 text-red', class: '' },
    { path: '/clients', title: 'Clients',  icon:'ni-bullet-list-67 text-red', class: '' },
    { path: '/medics', title: 'Medics',  icon:'ni-bullet-list-67 text-red', class: '' },
    { path: '/icons', title: 'Icons',  icon:'ni-planet text-blue', class: '' },
    { path: '/maps', title: 'Maps',  icon:'ni-pin-3 text-orange', class: '' },
    { path: '/user-profile', title: 'User profile',  icon:'ni-single-02 text-yellow', class: '' },
    { path: '/tables', title: 'Tables',  icon:'ni-bullet-list-67 text-red', class: '' },

];

export const ROUTESCompany: RouteInfo[] = [
  { path: '/insurances', title: 'Insurances',  icon:'ni-bullet-list-67 text-red', class: '' },
  { path: '/clients', title: 'Clients',  icon:'ni-bullet-list-67 text-red', class: '' },
 

];

export const ROUTESClient: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
  { path: '/clientCars', title: 'Cars',  icon:'ni-bullet-list-67 text-red', class: '' },

];
export const ROUTESAssurance: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
 

];
export const ROUTESIntervenantMedicale: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
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
