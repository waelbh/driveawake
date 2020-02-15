import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { CompanyServices } from 'src/app/services/UserService/CompanyServices';

@Component({
  selector: 'app-add-driver',
  templateUrl: './add-driver.component.html',
  styleUrls: ['./add-driver.component.scss']
})
export class AddDriverComponent implements OnInit {

  @Output() closing = new EventEmitter<boolean>();
  @Input() car:any = {};
 
  constructor(private companyservices:CompanyServices) {
       
  
   }

  ngOnInit() {
    console.log("hello Sir");
    this.closing.emit(false);
   console.log(this.car);


  }

  close() {
    this.closing.emit(true);
  }


  submitAdding() {
    
   this.companyservices.UpdateCar(this.car);
    this.closing.emit(true); 
// update
  }

}
