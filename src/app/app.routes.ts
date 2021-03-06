import { Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeRoutes } from './home/home.routes';
import { OnboardRoutes } from './onboard/onboard.routes';
import { VerifyRoutes } from './verify/verify.routes';
import { MapRoutes } from './maps/maps.routes';
import { TablesRoutes } from './tables/tables.routes';
import { AuthGuardService } from './shared/auth/auth-guard.service';

export const appRoutes: Routes = [
	{
		path: '',
		redirectTo: '/home',
		pathMatch: 'full'
	},
	{
		path: 'login',
		component: LoginComponent
	},
	...HomeRoutes,
	...OnboardRoutes,
	...VerifyRoutes,
	...MapRoutes,
	...TablesRoutes,
	{
		path: '**',
		redirectTo: '/home'
	}
];