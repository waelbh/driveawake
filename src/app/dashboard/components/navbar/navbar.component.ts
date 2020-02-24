import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { CompanyServices } from 'src/app/services/UserService/CompanyServices';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;
  public currentuser:any;
  public user:any = {};
  constructor(location: Location,  private element: ElementRef, private router: Router,private companyserv:CompanyServices) {
    this.location = location;
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    this.currentuser =JSON.parse( localStorage.getItem('user'));
    if(this.currentuser[0].role === "company"){
      this.companyserv.getCompanyById(this.currentuser[0].roleRefId).subscribe(data => {
         this.user =JSON.parse( JSON.stringify(data.data()));
      })
    }
    else if(this.currentuser[0].role === "intervenantMedical"){
      this.companyserv.getIntMedicaleById(this.currentuser[0].roleRefId).subscribe(data => {
        this.user =JSON.parse( JSON.stringify(data.data()));
     })
    }
    else if(this.currentuser[0].role === "client"){
      this.companyserv.getParrainById(this.currentuser[0].roleRefId).subscribe(data => {
        this.user =JSON.parse( JSON.stringify(data.data()));
     })
    }
    else if(this.currentuser[0].role === "assurance"){
      this.companyserv.getInsurranceById(this.currentuser[0].roleRefId).subscribe(data => {
        this.user =JSON.parse( JSON.stringify(data.data()));
     })
    }
    else {//superadmin
         this.user.name = "Admin"
    }
  }
  getTitle(){
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if(titlee.charAt(0) === '#'){
        titlee = titlee.slice( 1 );
    }

    for(var item = 0; item < this.listTitles.length; item++){
        if(this.listTitles[item].path === titlee){
            return this.listTitles[item].title;
        }
    }
    return 'Dashboard';
  }
  logout(){
    localStorage.removeItem('user');
    
    this.router.navigate(["login"]);
  }

}
