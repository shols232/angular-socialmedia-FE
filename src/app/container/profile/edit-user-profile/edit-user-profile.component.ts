import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
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
  selectedFile: File;
  profileDetails:boolean = true;

  constructor(private route: ActivatedRoute, 
    private profileService: ProfileService, 
    private authService: AuthService
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
    console.log(form.value)
    let data = new FormData(native)
    if(this.selectedFile){
      data.append('image',this.selectedFile)
    }

    this.profileService.updateProfile(this.profile.username, data).subscribe(data => {
      console.log(data)
    })
  }

}
