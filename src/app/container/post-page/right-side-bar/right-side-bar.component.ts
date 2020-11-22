import { Component, OnInit } from '@angular/core';
import { userFollowingService } from './right-sidebar.service'

export class Followers{
  bUrl = 'http://127.0.0.1:8000'
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
    console.log('http://127.0.0.1:8000' + this.user.image_url)
    return 'http://127.0.0.1:8000' + this.user.image_url
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
