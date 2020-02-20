import { Component, OnInit } from '@angular/core';
import { UserService, Mail } from 'src/app/services/UserService/UserService';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
   email:string = "";
   description:string = "";
   hided:boolean = true;
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  constructor(private userserv:UserService) {

  }

  ngOnInit() {

  }
  onSubmitContactUs(){
    let a = new Mail();
    a.description = this.description;
    a.email = this.email;
    this.userserv.createMail(a);
    this.description = "";
    this.email = "";
    this.hided = false;
  }

}
