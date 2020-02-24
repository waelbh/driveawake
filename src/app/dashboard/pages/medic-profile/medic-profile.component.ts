import { Component, OnInit } from '@angular/core';
import { IntervenantMedicale } from 'src/app/entities/IntervenantMedicale';
import { CompanyServices } from 'src/app/services/UserService/CompanyServices';

@Component({
  selector: 'app-medic-profile',
  templateUrl: './medic-profile.component.html',
  styleUrls: ['./medic-profile.component.scss']
})
export class MedicProfileComponent implements OnInit {

  medic:IntervenantMedicale=new IntervenantMedicale();
  medicpatients:number = 0 ;
  constructor(private companyservices:CompanyServices) { }
edit:boolean=true;
  ngOnInit() {
    let a =JSON.parse(localStorage.getItem('user'));
    console.log(a[0].roleRefId);
    this.companyservices.getIntMedicaleById(a[0].roleRefId).subscribe(data =>  {
      this.medic = JSON.parse(JSON.stringify(data.data()));  
this.medicpatients = this.medic.parrain.length;
    });
  }
  show(){
    this.edit=!this.edit;
    console.log(this.edit);
  }
  submitAdding(){
    this.companyservices.updateMedical(this.medic);
    this.edit=!this.edit;
  }

}
