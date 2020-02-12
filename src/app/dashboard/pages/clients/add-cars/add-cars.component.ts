import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { CompanyServices } from 'src/app/services/UserService/CompanyServices';
import { Observable } from 'rxjs';
import { Conducteur } from 'src/app/entities/Conducteur';
import { Assurance } from 'src/app/entities/Assurance';

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
  insurance:Assurance=new Assurance();

  constructor(private companyservices:CompanyServices) {
       
  
   }

  ngOnInit() {
    this.closing.emit(false);
   console.log(this.client);
   this.ListInsurance = this.companyservices.getInsurances();

  }

  close() {
    this.closing.emit(true);
  }


  submitAdding() {
    
   this.companyservices.updateClient(this.client);
    this.closing.emit(true); 
// update
  }

}
