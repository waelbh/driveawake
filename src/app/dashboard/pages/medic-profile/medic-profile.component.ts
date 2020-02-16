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
  constructor(private companyservices:CompanyServices) { }
edit:boolean=true;
  ngOnInit() {
    let a =JSON.parse(localStorage.getItem('user'));
    console.log(a[0].roleRefId);
    this.companyservices.getIntMedicaleById(a[0].roleRefId).subscribe(data =>  {
      this.medic = JSON.parse(JSON.stringify(data.data()));                   
    });
  }
  show(){
    this.edit=!this.edit;
    console.log(this.edit);
  }
  submitAdding(){
    //this.companyservices.updateClient(this.client);
    this.edit=!this.edit;
  }

}
