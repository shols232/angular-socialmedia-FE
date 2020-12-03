import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-msg',
  templateUrl: './error-msg.component.html',
  styleUrls: ['./error-msg.component.scss']
})
export class ErrorMsgComponent implements OnInit {
  generic_error = false;
  @Input('success') success = false;
  @Input('error_msg') error_msg = ''
  constructor() { }

  ngOnInit(): void {
  }

  clearMsg(){
    this.error_msg = ''
    this.generic_error = false
  }

}
