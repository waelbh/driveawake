import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Parain } from 'src/app/entities/Parrain';
import { CompanyServices } from 'src/app/services/UserService/CompanyServices';
import { Observable } from 'rxjs';
import { IntervenantMedicale } from 'src/app/entities/IntervenantMedicale';

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
    this.companyservices.addMedical(this.medic);
    
    //this.companyservices.addClient(this.client,this.medic);
 
    this.closing.emit(true);
// add
  }

}
