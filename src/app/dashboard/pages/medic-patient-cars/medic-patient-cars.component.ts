import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompanyServices } from 'src/app/services/UserService/CompanyServices';
import { Observable } from 'rxjs';
import { Conducteur } from 'src/app/entities/Conducteur';

@Component({
  selector: 'app-medic-patient-cars',
  templateUrl: './medic-patient-cars.component.html',
  styleUrls: ['./medic-patient-cars.component.scss']
})
export class MedicPatientCarsComponent implements OnInit {
  carList:Observable<any[]>;
  conducteur:Conducteur=new Conducteur();
  constructor( private route: ActivatedRoute, private companyservices: CompanyServices) { }
  id:any;
  ngOnInit() {
    this.id=this.route.snapshot.params.id;
    this.carList=this.companyservices.getCarsbyClient(this.route.snapshot.params.id);

  }

}
