import { Component, OnInit } from '@angular/core';
import { Parain } from 'src/app/entities/Parrain';
import { CompanyServices } from 'src/app/services/UserService/CompanyServices';

@Component({
  selector: 'app-clients-profile',
  templateUrl: './clients-profile.component.html',
  styleUrls: ['./clients-profile.component.scss']
})
export class ClientsProfileComponent implements OnInit {
 client:Parain=new Parain();
 edit:boolean=true;
  constructor(private companyservices:CompanyServices) { }

  ngOnInit() {
    let a =JSON.parse(localStorage.getItem('user'));
    console.log(a[0].roleRefId);
    this.companyservices.getClientById(a[0].roleRefId).subscribe(data =>  {
      this.client = JSON.parse(JSON.stringify(data.data()));                   
    });
  }
  showinfo(){
    console.log(this.client);
  }
  show(){
    this.edit=!this.edit;
    console.log(this.edit);
  }
  submitAdding(){
    this.companyservices.updateClient(this.client);
    this.edit=!this.edit;
  }
 

}
