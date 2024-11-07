import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { userSelector } from '../store/selectors/auth.selectors';
import { logoutAction } from '../store/actions/auth.actions';
import { fetchRecipesAction } from '../store/actions/recipes.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub: Subscription;

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService,
    private store: Store
  ) {}

  ngOnInit() {
    // this.userSub = this.authService.user.subscribe(user => {
    //   this.isAuthenticated = !!user;
    //   console.log(!user);
    //   console.log(!!user);
    // });

    this.userSub = this.store.select(userSelector).subscribe((user) => {
      this.isAuthenticated = !!user;
    });
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    //this.dataStorageService.fetchRecipes().subscribe();
    this.store.dispatch(fetchRecipesAction());
  }

  onLogout() {
    //this.authService.logout();
    this.store.dispatch(logoutAction());
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
