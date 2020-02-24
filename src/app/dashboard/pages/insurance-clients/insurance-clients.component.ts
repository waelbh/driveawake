import { Component, OnInit } from '@angular/core';
import { Parain } from 'src/app/entities/Parrain';
import { Assurance } from 'src/app/entities/Assurance';
import { CompanyServices } from 'src/app/services/UserService/CompanyServices';

@Component({
  selector: 'app-insurance-clients',
  templateUrl: './insurance-clients.component.html',
  styleUrls: ['./insurance-clients.component.scss']
})
export class InsuranceClientsComponent implements OnInit {

  insurance:Assurance=new Assurance();
  constructor(private companyservices:CompanyServices) { }
  clients:any[]=[];
  d:any;
  pat:Parain=new Parain();

  ngOnInit() {
    let a =JSON.parse(localStorage.getItem('user'));
    console.log(a[0].roleRefId);
    this.companyservices.getInsurranceById(a[0].roleRefId).subscribe(data =>  {
      this.insurance = JSON.parse(JSON.stringify(data.data()));     
      for(let c of this.insurance.parrains){
        console.log(c);
        this.companyservices.getParrainById(c).subscribe(data=>{
          this.pat=JSON.parse(JSON.stringify(data.data()));
          this.clients.push(this.pat);
        });
        
      }       
    });
    
    

  }
  show(){
    console.log(this.clients);
  }

}
