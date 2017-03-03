import { Routes } from '@angular/router';

import { OnboardComponent } from './onboard.component';
import { OnboardFormComponent } from './onboard-form.component';
import { AuthGuardService } from '../shared/auth/auth-guard.service';

export const OnboardRoutes: Routes = [
	{
		path: 'onboard',
		component: OnboardComponent,
		canActivate: [AuthGuardService]
	},
	{
		path: 'onboard/new',
		component: OnboardFormComponent,
		canActivate: [AuthGuardService]
	},
	{
		path: 'onboard/new/:id',
		component: OnboardFormComponent,
		canActivate: [AuthGuardService]
	}
];