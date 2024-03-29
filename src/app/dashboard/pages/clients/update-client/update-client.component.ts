import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { CompanyServices } from 'src/app/services/UserService/CompanyServices';

@Component({
  selector: 'app-update-client',
  templateUrl: './update-client.component.html',
  styleUrls: ['./update-client.component.scss']
})
export class UpdateClientComponent implements OnInit {

  @Output() closing = new EventEmitter<boolean>();
  @Input() client:any = {};
 
  constructor(private companyservices:CompanyServices) {
       
  
   }

  ngOnInit() {
    this.closing.emit(false);
   console.log(this.client);


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
