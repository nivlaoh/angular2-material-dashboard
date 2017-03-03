import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignaturePadModule } from 'angular2-signaturepad';

import { SharedModule } from '../shared/shared.module';
import { UserService } from '../shared/user/user.service';
import { VerifyComponent } from './verify.component';
// import { CapitalizePipe } from '../shared/utils/capitalize.pipe';

@NgModule({
  imports: [
    SharedModule,
    SignaturePadModule
  ],
  declarations: [ VerifyComponent ],
  providers: []
})
export class VerifyModule { }
