import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [UserService],
})
export class UserComponent implements OnInit {
  id: number;
  activated: boolean;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  onActivated() {
    this.userService.activated.next(true);
  }
  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
    });
    this.userService.activated.subscribe((booleanVal: boolean) => {
      this.activated = booleanVal;
    });
  }
}
