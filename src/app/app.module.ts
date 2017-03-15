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
import { HomeModule } from './home/home.module';
import { SharedModule } from './shared/shared.module';
import { VerifyModule } from './verify/verify.module';
import { OnboardModule } from './onboard/onboard.module';
import { LoginModule } from './login/login.module';
import { VerifyComponent } from './verify/verify.component';
import { CapitalizePipe } from './shared/utils/capitalize.pipe';
import { HomeComponent } from './home/home.component';

const localStorageConfig = {
  prefix: 'app.'
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AuthModule,
    RouterModule.forRoot(appRoutes),
    MaterialModule.forRoot(),
    FlexLayoutModule.forRoot(),
    SharedModule.forRoot(),
    HomeModule,
    LoginModule,
    VerifyModule,
    OnboardModule
  ],
  providers: [AuthService, AuthGuardService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
