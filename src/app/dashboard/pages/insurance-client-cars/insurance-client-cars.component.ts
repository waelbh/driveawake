import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompanyServices } from 'src/app/services/UserService/CompanyServices';
import { Observable } from 'rxjs';
import { Conducteur } from 'src/app/entities/Conducteur';

@Component({
  selector: 'app-insurance-client-cars',
  templateUrl: './insurance-client-cars.component.html',
  styleUrls: ['./insurance-client-cars.component.scss']
})
export class InsuranceClientCarsComponent implements OnInit {

  carList:Observable<any[]>;
  conducteur:Conducteur=new Conducteur();
  currentuser:any= {};
  constructor( private route: ActivatedRoute, private companyservices: CompanyServices) { }
  id:any;
  ngOnInit() {
    this.id=this.route.snapshot.params.id;
    this.currentuser =JSON.parse( localStorage.getItem('user'));
    console.log(this.currentuser)
    this.carList=this.companyservices.getCarsbyClientAndinssures(this.id,this.currentuser[0].email);
            
  }
}
