import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AUTH_PROVIDERS } from 'angular2-jwt';
import { BROWSER_STORAGE_PROVIDERS, ConfigureStorage, WebStorageModule } from 'h5webstorage';
import 'hammerjs';

import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { AuthModule } from './shared/auth/auth.module';
import { AuthService } from './shared/auth/auth.service';
import { AuthGuardService } from './shared/auth/auth-guard.service';
import { UserService } from './shared/user/user.service';
import { SharedModule } from './shared/shared.module';
import { VerifyModule } from './verify/verify.module';
import { OnboardModule } from './onboard/onboard.module';
import { LoginModule } from './login/login.module';
import { VerifyComponent } from './verify/verify.component';
import { CapitalizePipe } from './shared/utils/capitalize.pipe';

const localStorageConfig = {
  prefix: 'app.'
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    WebStorageModule,
    HttpModule,
    AuthModule,
    RouterModule.forRoot(appRoutes),
    MaterialModule.forRoot(),
    FlexLayoutModule.forRoot(),
    SharedModule.forRoot(),
    LoginModule,
    VerifyModule,
    OnboardModule
  ],
  providers: [AuthService, AuthGuardService, UserService, BROWSER_STORAGE_PROVIDERS, ConfigureStorage(localStorageConfig)],
  bootstrap: [AppComponent]
})
export class AppModule { }
