import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AUTH_PROVIDERS } from 'angular2-jwt';
import { Ng2Webstorage } from 'ng2-webstorage';
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
import { MapsModule } from './maps/maps.module';
import { TablesModule } from './tables/tables.module';

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
    Ng2Webstorage.forRoot({ prefix: 'app', separator: '.' }),
    RouterModule.forRoot(appRoutes),
    MaterialModule.forRoot(),
    FlexLayoutModule.forRoot(),
    SharedModule.forRoot(),
    HomeModule,
    LoginModule,
    MapsModule,
    VerifyModule,
    OnboardModule,
    TablesModule
  ],
  providers: [AuthService, AuthGuardService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
