import { Component, OnInit } from '@angular/core';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { SuperAdminServices } from 'src/app/services/UserService/SuperAdminServices';
import { CompanyServices } from 'src/app/services/UserService/CompanyServices';
import { Conducteur } from 'src/app/entities/Conducteur';
import { ActivatedRoute } from '@angular/router';
import { Parain } from 'src/app/entities/Parrain';
import { analytics } from 'firebase';
@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss']
})
export class CarsComponent implements OnInit {
  closeResult: string;
  ListCars:any[]= [];
  carselected:any;
  currentclient:Parain= new Parain();
  constructor(private modalService: NgbModal,private companyServices:CompanyServices,private route:ActivatedRoute) {
  
    this.companyServices.getParrainById(this.route.snapshot.params.id).subscribe(data => {

      this.currentclient = JSON.parse(JSON.stringify(data.data()))
        console.log(this.currentclient);
    });


  this.companyServices.getCarsByParrain(this.route.snapshot.params.id).subscribe(data => {
    this.ListCars = data;
    console.log(this.ListCars);

    });
   }

  ngOnInit() {
    
  }

  delete(x){
    if(!x.assurance){
      this.companyServices.deleteCar(x,false,false);
    }else {
      let counter = 0;
      for(let a of this.ListCars){
        if(x.assuranceName === a.assuranceName){
          counter = counter+ 1 ;
        }
      }
      if(counter === 1){
        this.companyServices.deleteCar(x,true,true);
      }else {
        this.companyServices.deleteCar(x,true,false);
      }
     
    }
    console.log(x)
   
  }

  open1(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  

  closee(t: boolean) {
    if (t == true) {
      this.modalService.dismissAll();

    }
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
