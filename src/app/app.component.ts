import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss', '../../node_modules/boxicons/css/boxicons.min.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  title = 'void';

  constructor(private authService: AuthService){}

  ngOnInit(){
    this.authService.autoLogin()
    console.log(this.authService.user.getValue())
  }
}
