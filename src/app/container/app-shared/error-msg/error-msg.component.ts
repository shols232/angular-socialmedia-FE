import { Component, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-error-msg',
  templateUrl: './error-msg.component.html',
  styleUrls: ['./error-msg.component.scss']
})
export class ErrorMsgComponent implements OnInit {
  generic_error = false;
  @Input('success') success = false;
  @Input('error_msg') error_msg = ''
  @Output('closed') closed: Subject<void> = new Subject<void>()
  constructor() { }

  ngOnInit(): void {
  }

  clearMsg(){
    this.closed.next()
  }

}
