import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CompanyServices } from 'src/app/services/UserService/CompanyServices';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  closeResult: string;
  ListClients:Observable<any[]>;
  clienttoupdate:any;
  constructor(private modalService: NgbModal,private companyServices:CompanyServices) {
    this.ListClients = this.companyServices.getClients();
    console.log(this.ListClients)
   }

  ngOnInit() {
    
  }

  delete(x){
    console.log(x)
    this.companyServices.deleteClient(x);
  }

  open1(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  open2(content,x) {
    this.clienttoupdate = x;
    this.modalService.open(content, { ariaLabelledBy: 'modal2-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  open3(content,x) {
   this.clienttoupdate = x;
   console.log(this.clienttoupdate);
    this.modalService.open(content, { ariaLabelledBy: 'modal3-basic-title' }).result.then((result) => {
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
  getstyle(picture){
    return {
      'background-image':"url('../../assets/img/person.png')" ,
      'background-size': 'cover',
      'background-position': 'center'
  
    }
  }

}
