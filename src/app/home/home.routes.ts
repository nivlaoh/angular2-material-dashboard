import { Routes } from '@angular/router';

import { AuthGuardService } from '../shared/auth/auth-guard.service';
import { HomeComponent } from './home.component';

export const HomeRoutes: Routes = [
	{
		path: 'home',
		component: HomeComponent,
		canActivate: [AuthGuardService]
	}
];