import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { StoreModule } from '@ngrx/store';
import { mainAppReducer } from './store/reducers/app.reducer';
import { EffectsModule } from '@ngrx/effects';
//import { AuthEffects } from './store/effects/auth.effects';
import { AuthLoginEffect } from './store/effects/auth/auth-login.effect';
import * as authLoginSuccess from './store/effects/auth/auth-success.effect';
import * as authSignup from './store/effects/auth/auth-signup.effect';
import * as authLogoutEffect from './store/effects/auth/auth-logout.effect';
import * as authAutoLoginEffect from './store/effects/auth/auth-auto-login.effect';

import * as recipesEffect from './store/effects/recipe/recipe.effects';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
    StoreModule.forRoot(mainAppReducer, {}),
    EffectsModule.forRoot([
      authLoginSuccess,
      AuthLoginEffect,
      authSignup,
      authLogoutEffect,
      authAutoLoginEffect,
      recipesEffect,
    ]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    StoreRouterConnectingModule.forRoot(),
  ],
  bootstrap: [AppComponent],
  // providers: [LoggingService]
})
export class AppModule {}
