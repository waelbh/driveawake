import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { SuperAdminServices } from 'src/app/services/UserService/SuperAdminServices';
import { Company } from 'src/app/entities/Company';

@Component({
  selector: 'app-update-company',
  templateUrl: './update-company.component.html',
  styleUrls: ['./update-company.component.scss']
})
export class UpdateCompanyComponent implements OnInit {

  @Output() closing = new EventEmitter<boolean>();
  @Input() company:any = {};
 
  constructor(private superadminservices:SuperAdminServices) {
       
  
   }

  ngOnInit() {
    this.closing.emit(false);
   console.log(this.company);


  }

  close() {
    this.closing.emit(true);
  }


  submitAdding() {
    
   this.superadminservices.updateCompany(this.company);
    this.closing.emit(true); 
// update
  }

}
