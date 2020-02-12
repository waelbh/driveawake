import { Component, OnInit } from '@angular/core';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { SuperAdminServices } from 'src/app/services/UserService/SuperAdminServices';
import { CompanyServices } from 'src/app/services/UserService/CompanyServices';
@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss']
})
export class CarsComponent implements OnInit {
  closeResult: string;
  ListCars:Observable<any[]>;
  carselected:any;
  constructor(private modalService: NgbModal,private companyServices:CompanyServices) {
    this.ListCars = this.companyServices.getCars();
   }

  ngOnInit() {
    
  }

  delete(x){
    console.log(x)
    this.companyServices.deleteCar(x);
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
