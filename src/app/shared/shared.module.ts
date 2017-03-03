import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CapitalizePipe } from './utils/capitalize.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [CommonModule, FlexLayoutModule, FormsModule, MaterialModule, ReactiveFormsModule, RouterModule, CapitalizePipe],
  declarations: [CapitalizePipe]
})
export class SharedModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: SharedModule,
			providers: [
    		]
		};
	}
}
