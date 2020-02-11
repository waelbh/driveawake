import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Assurance } from 'src/app/entities/Assurance';
import { CompanyServices } from 'src/app/services/UserService/CompanyServices';

@Component({
  selector: 'app-add-insurance',
  templateUrl: './add-insurance.component.html',
  styleUrls: ['./add-insurance.component.scss']
})
export class AddInsuranceComponent implements OnInit {

  @Output() closing = new EventEmitter<boolean>();
 
  insurance:Assurance = new Assurance();
  constructor(private companyservices:CompanyServices) { }

  ngOnInit() {
    this.closing.emit(false);
   
  }

  close() {
    this.closing.emit(true);
  }


  submitAdding() {
    
    this.companyservices.addInsurance(this.insurance);
 
    this.closing.emit(true);
// add
  }

}
