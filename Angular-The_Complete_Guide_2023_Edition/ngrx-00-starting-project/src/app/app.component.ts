import { Component, OnInit } from '@angular/core';

import { AuthService } from './auth/auth.service';
import { LoggingService } from './logging.service';
import { StoreModel } from './store/store.model';
import { Store } from '@ngrx/store';
import { autoLoginAction } from './store/actions/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private loggingService: LoggingService,
    private store: Store<StoreModel>
  ) {}

  ngOnInit() {
    //this.authService.autoLogin();
    this.store.dispatch(autoLoginAction());
    this.loggingService.printLog('Hello from AppComponent ngOnInit');
  }
}
