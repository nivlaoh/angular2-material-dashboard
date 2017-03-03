import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

	constructor(private router: Router, private authService: AuthService) { }

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
	  	if (this.authService.isLoggedIn()) {
			console.log('User is logged in');
			if (state.url === '/login') {
	        	this.router.navigate(['/onboard']);
			}
			return true;
	    }

	    if (state.url !== '/login') {
			// Store the attempted URL for redirecting
			this.authService.redirectUrl = state.url;

			// Navigate to the login page
			this.router.navigate(['/login']);
	    }
	    else {
			return true;
	    }
	    return false;
	}

}