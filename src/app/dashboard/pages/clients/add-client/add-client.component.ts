import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Parain } from 'src/app/entities/Parrain';
import { CompanyServices } from 'src/app/services/UserService/CompanyServices';
import { Observable } from 'rxjs';
import { IntervenantMedicale } from 'src/app/entities/IntervenantMedicale';
import { Company } from 'src/app/entities/Company';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {
  @Output() closing = new EventEmitter<boolean>();
 
  client:Parain = new Parain();
  medic:IntervenantMedicale=new IntervenantMedicale();
  checkState:boolean=false;
  Company:Company = new Company(); 
  constructor(private companyservices:CompanyServices) { 
  }
  ListInsurance:Observable<any[]>;
  ngOnInit() {
    this.closing.emit(false);
    this.ListInsurance = this.companyservices.getInsurances();

  
   
  }

  close() {
    this.closing.emit(true);
  }
  changeType(){
    this.checkState=!this.checkState;
    console.log(this.checkState);
  }


  submitAdding() {
    this.client.medic=this.medic;
     

    let a =JSON.parse(localStorage.getItem('user'));
    //get by id
console.log(a[0].roleRefId);
    this.companyservices.getCompanyById(a[0].roleRefId).subscribe(data =>  {
      this.Company = JSON.parse(JSON.stringify(data.data()));
      this.companyservices.addClient(this.Company,this.client,this.medic);
      
      this.closing.emit(true);
    });
  
// add
  }

}
