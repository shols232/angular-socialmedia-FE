import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  isLogin: boolean = true;
  @ViewChild('container') contDiv: ElementRef;
  @ViewChild('signUpForm') signUpForm: NgForm;
  @ViewChild('signInForm') signInForm: NgForm;
  constructor(
    private authService: AuthService, 
    private renderer: Renderer2, 
    private router: Router,
    ) { }

  ngOnInit(): void {
  }

  toggleLoginRegisterForm(){
    const cont = this.contDiv.nativeElement
    if (this.isLogin){
      this.renderer.addClass(cont, 'sign-up-mode')
      this.signInForm.resetForm()
    }else{
      this.renderer.removeClass(cont, 'sign-up-mode')
      this.signUpForm.resetForm()
    }
    this.isLogin = !this.isLogin
  }

  logIn(form: NgForm){
    const username = form.value.username
    const password = form.value.password
    this.authService.logIn(username, password).subscribe(resData => {
      console.log(resData)
      this.router.navigate(['/'])
    }, errors => {
      console.log(errors)
    })
    console.log(form.value)
  }

  signUp(form: NgForm){
    const username = form.value.username
    const password = form.value.password
    const first_name = form.value.first_name
    const last_name = form.value.last_name
    const email = form.value.email
    this.authService.signUp(username, email, first_name, last_name, password).subscribe(resData => {
      console.log(resData)
      this.router.navigate(['/'])
    }, error => {
      console.log(error)
    })
    console.log(form.value)
  }
}
