import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { CompanyServices } from 'src/app/services/UserService/CompanyServices';

@Component({
  selector: 'app-update-insurance',
  templateUrl: './update-insurance.component.html',
  styleUrls: ['./update-insurance.component.scss']
})
export class UpdateInsuranceComponent implements OnInit {

  @Output() closing = new EventEmitter<boolean>();
  @Input() insurance:any = {};
 
  constructor(private companyservices:CompanyServices) {
       
  
   }

  ngOnInit() {
    this.closing.emit(false);
   console.log(this.insurance);


  }

  close() {
    this.closing.emit(true);
  }


  submitAdding() {
    
   this.companyservices.updateInsurance(this.insurance);
    this.closing.emit(true); 
// update
  }

}
