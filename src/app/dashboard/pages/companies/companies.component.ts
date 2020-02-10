import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { SuperAdminServices } from 'src/app/services/UserService/SuperAdminServices';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {
  closeResult: string;
  ListCompany:Observable<any[]>;
  companytoupdate:any;
  constructor(private modalService: NgbModal,private superAdminServices:SuperAdminServices) {
    this.ListCompany = this.superAdminServices.getCompanies();
    console.log(this.ListCompany)
   }

  ngOnInit() {
    
  }

  delete(x){
    console.log(x)
    this.superAdminServices.deleteCompany(x);
  }

  open1(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  open2(content,x) {
    this.companytoupdate = x;
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
