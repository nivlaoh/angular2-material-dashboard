import { Routes } from '@angular/router';

import { AuthGuardService } from '../shared/auth/auth-guard.service';
import { VerifyComponent } from './verify.component';

export const VerifyRoutes: Routes = [
	{
		path: 'verify',
		component: VerifyComponent,
		canActivate: [AuthGuardService]
	}
];