import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from '../services/user.service';
import { CounterService } from '../services/counter.service';

@Component({
  selector: 'app-inactive-users',
  templateUrl: './inactive-users.component.html',
  styleUrls: ['./inactive-users.component.css'],
  providers: [],
})
export class InactiveUsersComponent implements OnInit {
  @Input() users: string[];

  inactiveCount: number;

  onSetToActive(id: number) {
    this.userService.setToActive(id);
  }

  ngOnInit(): void {
    this.counterService.inactiveCountEmitter.subscribe(
      (inactiveCount: number) => {
        this.inactiveCount = inactiveCount;
      }
    );
  }

  constructor(
    private userService: UserService,
    private counterService: CounterService
  ) {}
}
