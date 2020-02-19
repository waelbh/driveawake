import { Component, OnInit } from '@angular/core';
import { Assurance } from 'src/app/entities/Assurance';
import { CompanyServices } from 'src/app/services/UserService/CompanyServices';

@Component({
  selector: 'app-insurance-profile',
  templateUrl: './insurance-profile.component.html',
  styleUrls: ['./insurance-profile.component.scss']
})
export class InsuranceProfileComponent implements OnInit {
  insurance:Assurance=new Assurance();
  constructor(private companyservices:CompanyServices) { }
edit:boolean=true;
  ngOnInit() {
    let a =JSON.parse(localStorage.getItem('user'));
    console.log(a[0].roleRefId);
    this.companyservices.getInsurranceById(a[0].roleRefId).subscribe(data =>  {
      this.insurance = JSON.parse(JSON.stringify(data.data()));                   
    });
  }
  show(){
    this.edit=!this.edit;
    console.log(this.edit);
  }
  submitAdding(){
    this.companyservices.updateInsurance(this.insurance);
    this.edit=!this.edit;
  }

}
