import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/user.model';
import 'boxicons'

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss', 
  '../../../../node_modules/boxicons/css/boxicons.min.css']
})
export class SideBarComponent implements OnInit {
  user: User
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.user = this.authService.user.getValue()
  }

}
