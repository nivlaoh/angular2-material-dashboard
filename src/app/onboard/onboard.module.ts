import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleSnackBar } from '@angular/material';
import { SignaturePadModule } from 'angular2-signaturepad';

import { OnboardComponent } from './onboard.component';
import { OnboardFormComponent, PhotoDialog } from './onboard-form.component';
import { ReferenceService } from './reference.service';
import { SharedModule } from '../shared/shared.module';
import { UserService } from '../shared/user/user.service';

@NgModule({
  imports: [
    SharedModule,
    SignaturePadModule
  ],
  declarations: [ OnboardComponent, OnboardFormComponent, PhotoDialog ],
  entryComponents: [ PhotoDialog, SimpleSnackBar ],
  providers: [ ReferenceService ]
})
export class OnboardModule { }
