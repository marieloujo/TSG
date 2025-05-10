import { Component } from '@angular/core';
import { SessionItemComponent } from './session-item/session-item.component';

@Component({
  selector: 'app-sessions',
  imports: [
    SessionItemComponent
  ],
  templateUrl: './sessions.component.html'
})
export class SessionsComponent {

}
