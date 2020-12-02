import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/user.model';
import { Profile } from '../profile.model';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-edit-user-profile',
  templateUrl: './edit-user-profile.component.html',
  styleUrls: ['./edit-user-profile.component.scss']
})
export class EditUserProfileComponent implements OnInit {
  profile: Profile
  bio: string
  isLoading = false;
  selectedFile: File;
  profileDetails:boolean = true;

  constructor(private route: ActivatedRoute, 
    private profileService: ProfileService, 
    private authService: AuthService,
    private cookieService: CookieService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.getUserProfile()
  }

  toggleProfileDetails(){
    this.profileDetails = !this.profileDetails
  }

  onFileChanged(event){
    this.selectedFile = event.target.files[0]
    console.log(this.selectedFile)
  }

  getUserProfile(){
    this.route.params.subscribe(params => {
      let username: string = params['username']
      this.profileService.getUserProfile(username).subscribe(profile => {
        console.log(profile)
        this.profile = profile
        this.bio = this.profile.bio
      })
    })
  }

  onSubmit(form: NgForm, native:HTMLFormElement){
    this.isLoading = true;
    console.log(form.value)
    let data = new FormData(native)
    if(this.selectedFile){
      data.append('image',this.selectedFile)
    }

    this.profileService.updateProfile(this.profile.username, data).subscribe(data => {
      const user: User = JSON.parse(this.cookieService.get('user'))
      user.profile_picture = data.image_url
      this.authService.user.next(user)
      this.cookieService.set('user', JSON.stringify(user))
      this.router.navigate(['profile', this.profile.username])
    }, (error) => {
        this.isLoading = false;
        console.log(error)
    } )
  }

}
