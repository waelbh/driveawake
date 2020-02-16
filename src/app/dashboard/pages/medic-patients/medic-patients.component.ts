import { Component, OnInit } from '@angular/core';
import { IntervenantMedicale } from 'src/app/entities/IntervenantMedicale';
import { CompanyServices } from 'src/app/services/UserService/CompanyServices';
import { Observable } from 'rxjs';
import { Parain } from 'src/app/entities/Parrain';

@Component({
  selector: 'app-medic-patients',
  templateUrl: './medic-patients.component.html',
  styleUrls: ['./medic-patients.component.scss']
})
export class MedicPatientsComponent implements OnInit {
  medic:IntervenantMedicale=new IntervenantMedicale();
  constructor(private companyservices:CompanyServices) { }
  patients:any[]=[];
  d:any;
  pat:Parain=new Parain();

  ngOnInit() {
    let a =JSON.parse(localStorage.getItem('user'));
    console.log(a[0].roleRefId);
    this.companyservices.getIntMedicaleById(a[0].roleRefId).subscribe(data =>  {
      this.medic = JSON.parse(JSON.stringify(data.data()));     
      for(let c of this.medic.parrain){
        console.log(c);
        this.companyservices.getParrainById(c).subscribe(data=>{
          this.pat=JSON.parse(JSON.stringify(data.data()));
          this.patients.push(this.pat);
        });
        
      }       
    });
    
    

  }
  show(){
    console.log(this.patients);
  }

}
