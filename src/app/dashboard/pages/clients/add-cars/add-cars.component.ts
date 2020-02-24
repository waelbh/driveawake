import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { CompanyServices } from 'src/app/services/UserService/CompanyServices';
import { Observable } from 'rxjs';
import { Conducteur } from 'src/app/entities/Conducteur';
import { Assurance } from 'src/app/entities/Assurance';

import { routerNgProbeToken } from '@angular/router/src/router_module';
import { Parain } from 'src/app/entities/Parrain';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-cars',
  templateUrl: './add-cars.component.html',
  styleUrls: ['./add-cars.component.scss']
})
export class AddCarsComponent implements OnInit {

  @Output() closing = new EventEmitter<boolean>();
  @Input() client:any = {};
  car:Conducteur=new Conducteur();
  ListInsurance:Observable<any[]>;
  checkState:boolean=false;
  Newinsurance:Assurance=new Assurance();
  selectedparrain:Parain = new Parain();
  selectedInsurance:Assurance = new Assurance();

  constructor(private companyservices:CompanyServices,private Route:ActivatedRoute) {
       
    
   }

  ngOnInit() {
    console.log(this.Route.snapshot.params.id);
  this.companyservices.getParrainById(this.Route.snapshot.params.id).subscribe(data => {

    this.selectedparrain = JSON.parse(JSON.stringify(data.data()))
      console.log(this.selectedparrain);
  });
  


    this.closing.emit(false);
   console.log(this.client);
   this.ListInsurance = this.companyservices.getInsurances();

  }

  close() {
    this.closing.emit(true);
  }


  submitAdding() {
    if(this.checkState){
  // this.car.assurance  assurance id 
   this.companyservices.getInsurranceById(this.selectedInsurance.id).subscribe(data => {
     this.selectedInsurance = JSON.parse(JSON.stringify(data.data()));
     console.log(this.selectedInsurance);


     //pursuivre 
     this.companyservices.CreateCarwithassignassurance(this.car,this.selectedparrain,this.selectedInsurance);
   });

       

         
  this.closing.emit(true); 
    }else{
     


      this.companyservices.CreateCarwithinsuranceDetails(this.car,this.selectedparrain,this.Newinsurance);

      this.closing.emit(true);
     
    }
 

  }

}
