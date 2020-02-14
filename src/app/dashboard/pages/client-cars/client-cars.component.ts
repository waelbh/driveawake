import { Component, OnInit } from '@angular/core';
import { CompanyServices } from 'src/app/services/UserService/CompanyServices';
import { Observable } from 'rxjs';
import { Conducteur } from 'src/app/entities/Conducteur';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-client-cars',
  templateUrl: './client-cars.component.html',
  styleUrls: ['./client-cars.component.scss']
})
export class ClientCarsComponent implements OnInit {
  carList:Observable<any[]>;
  conducteur:Conducteur=new Conducteur();
  closeResult;
  cartoupdate:any;
  constructor(private companyservices:CompanyServices,private modalService: NgbModal) { }

  ngOnInit() {
    let a =JSON.parse(localStorage.getItem('user'));
    //get by id
console.log(a[0].roleRefId);
this.carList=this.companyservices.getCarsbyClient(a[0].roleRefId);
console.log(this.carList);
  }
  showinfo(){
    console.log(this.carList);
  }
  showorhide(conducteur:Conducteur):boolean{
    console.log(conducteur.nameDriver);
    if(conducteur.nameDriver===undefined)
    return true;
    return false;
  }
  open2(content,x) {
    this.cartoupdate = x;
    this.modalService.open(content, { ariaLabelledBy: 'modal2-basic-title' }).result.then((result) => {
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
  formulairesubmited(){

  }

  
}
