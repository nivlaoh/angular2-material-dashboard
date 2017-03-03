import { Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { OnboardRoutes } from './onboard/onboard.routes';
import { VerifyRoutes } from './verify/verify.routes';
import { AuthGuardService } from './shared/auth/auth-guard.service';

export const appRoutes: Routes = [
	{
		path: '',
		redirectTo: '/onboard',
		pathMatch: 'full'
	},
	{
		path: 'login',
		component: LoginComponent
	},
	...OnboardRoutes,
	...VerifyRoutes,
	{
		path: '**',
		redirectTo: '/onboard'
	}
];