import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { CounterService } from '../services/counter.service';

@Component({
  selector: 'app-active-users',
  templateUrl: './active-users.component.html',
  styleUrls: ['./active-users.component.css'],
})
export class ActiveUsersComponent implements OnInit {
  //@Input() users: string[];
  users: string[];
  activeCount: number;

  onSetToInactive(id: number) {
    this.userService.setToInactive(id);
  }

  ngOnInit(): void {
    this.users = this.userService.getActiveUsers();
    this.counterService.activeCountEmitter.subscribe((activeCount: number) => {
      this.activeCount = activeCount;
    });
  }
  constructor(
    private userService: UserService,
    private counterService: CounterService
  ) {}
}
