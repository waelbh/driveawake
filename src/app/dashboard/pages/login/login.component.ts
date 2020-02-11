import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services/UserService/UserService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  email: string = '';
  password: string = '';
  incorrectCredentials = true;
  constructor(private userService: UserService, private router: Router) {
    if(localStorage.getItem('user')!=null)
    this.router.navigateByUrl('/dashboard');
  }

  ngOnInit() {
  }
  ngOnDestroy() {
  }

  loginU() {
    this.userService.checkLogin(this.email, this.password).subscribe(e => {
      if (e.length > 0) {
        localStorage.setItem('user', JSON.stringify(e));
        this.router.navigateByUrl('/dashboard');
      }
      else
        this.incorrectCredentials = false;
    });
  }
}
