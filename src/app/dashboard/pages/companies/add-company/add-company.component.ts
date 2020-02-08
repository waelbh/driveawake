import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Company } from 'src/app/entities/Company';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss']
})
export class AddCompanyComponent implements OnInit {

  @Output() closing = new EventEmitter<boolean>();
  @Output() added = new EventEmitter<boolean>();
  company:Company;
  constructor() { }

  ngOnInit() {
    this.closing.emit(false);
    this.added.emit(false);
  }

  close() {
    this.closing.emit(true);
  }


  submitAddingPromotion() {
// add
  }
}
