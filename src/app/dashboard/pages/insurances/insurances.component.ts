import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { CompanyServices } from 'src/app/services/UserService/CompanyServices';

@Component({
  selector: 'app-insurances',
  templateUrl: './insurances.component.html',
  styleUrls: ['./insurances.component.scss']
})
export class InsurancesComponent implements OnInit {
  closeResult: string;
  ListInsurance:Observable<any[]>;
  companytoupdate:any;
  constructor(private modalService: NgbModal,private companyServices:CompanyServices) {
    this.ListInsurance = this.companyServices.getInsurances();
    console.log(this.ListInsurance)
   }

  ngOnInit() {
    
  }

  delete(x){
    console.log(x)
    this.companyServices.deleteInsurance(x);
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
