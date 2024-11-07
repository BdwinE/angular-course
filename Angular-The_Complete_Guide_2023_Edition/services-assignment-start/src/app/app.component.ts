import { Component } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService],
})
export class AppComponent {
  activeUsers = this.userService.getActiveUsers();
  inactiveUsers = this.userService.getInactiveUsers();

  constructor(private userService: UserService) {}
}
