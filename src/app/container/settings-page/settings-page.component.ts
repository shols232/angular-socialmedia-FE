import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {SettingsService} from './settings.service'

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent implements OnInit {
  alert_msg: string = ''
  enable_follow_me: boolean;
  enable_message_me: boolean;
  enable_tagging: boolean;
  alert_box_opened = false;

  constructor(private settingsService: SettingsService, private router: Router) { }

  ngOnInit(): void {
    this.settingsService.getSettings().subscribe(data => {
      this.enable_follow_me = data.enable_follow_me
      this.enable_message_me = data.enable_message_me
      this.enable_tagging = data.enable_tagging
    })
  }

  onSubmit(form: NgForm){
    console.log(form, form.value, form.control.get('enable_follow_me'))
    this.settingsService.updateSetting(this.enable_follow_me,
      this.enable_message_me, this.enable_tagging).subscribe(data => {
        if(data['status'] == true){
          this.alert_msg = 'Your new changes have been successfully implemented!'
          setTimeout(()=>{
            this.router.navigate(['/'])
          }, 900)
        }
      })
  }

}
