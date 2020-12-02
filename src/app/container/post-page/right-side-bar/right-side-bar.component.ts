import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { userFollowingService } from './right-sidebar.service'

export class Followers{
  bUrl = environment.backendUrl
  constructor(
    public user:{
    username:string,
    id:string,
    bio:string,
    first_name:string,
    last_name:string,
    image_url: string
  }
  ){}

  
  public get image_url() : string {
    return this.user.image_url
  }
  
}

@Component({
  selector: 'app-right-side-bar',
  templateUrl: './right-side-bar.component.html',
  styleUrls: ['./right-side-bar.component.scss'],
  providers:[userFollowingService]
})
export class RightSideBarComponent implements OnInit {

  followers: Followers[] = []

  constructor(private userFollowing: userFollowingService) { }

  ngOnInit(): void {
    this.getTopUserFollowing()
  }


  getTopUserFollowing(){
    this.userFollowing.usersQuery().subscribe(followers => {
      console.log(followers)
      this.followers = followers
    })
  }
}
