import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Profile } from '../profile.model';
import { ProfileService } from '../profile.service'

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  owner: boolean = false;
  follows: boolean = true;
  currLocation = 'posts'
  profile: Profile
  @ViewChild('followEl') followEl: ElementRef;

  constructor(
    private profileService: ProfileService, 
    private route: ActivatedRoute,
    private renderer: Renderer2
    ) { }

  ngOnInit(): void {
    this.getUserProfile()
  }

  onMessageUser(){
  }

  onToggleFollow(){
    let action = this.follows ? 'unfollow' : 'follow'
    this.profileService.toggleFollow(action, this.profile.username).subscribe(data => {
      console.log(data)
        if(data['status']=='success'){
          const followEl = this.followEl.nativeElement
          const currentCount = parseInt(followEl.innerText)
          if (action == 'follow'){
            this.renderer.setProperty(followEl, 'innerText', currentCount + 1)
          }else{
            this.renderer.setProperty(followEl, 'innerText', currentCount - 1)
          }
          this.follows = !this.follows
        }
    })
  }

  toggleBottomDiv(loc: string){
    this.currLocation = loc
  }

  getUserProfile(){
    this.route.params.subscribe(params => {
      this.profileService.getUserProfile(params['username']).subscribe(profile => {
        console.log(profile)
        this.owner = profile.owner
        this.follows = profile.follows
        this.profile = profile
      })
    })
  }

}
