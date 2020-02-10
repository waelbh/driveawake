import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Company } from 'src/app/entities/Company';
import { SuperAdminServices } from 'src/app/services/UserService/SuperAdminServices';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss']
})
export class AddCompanyComponent implements OnInit {

  @Output() closing = new EventEmitter<boolean>();
 
  company:Company = new Company();
  constructor(private superadminservices:SuperAdminServices) { }

  ngOnInit() {
    this.closing.emit(false);
   
  }

  close() {
    this.closing.emit(true);
  }


  submitAdding() {
    
    this.superadminservices.addCompany(this.company);
 
    this.closing.emit(true);
// add
  }
  
}
