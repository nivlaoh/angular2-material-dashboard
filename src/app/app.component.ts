import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MdIconRegistry, MdSidenav } from '@angular/material';

import { AuthService } from './shared/auth/auth.service';
import { User } from './shared/user/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'app works!';
	@ViewChild('sidebar')
	sidebar: MdSidenav;
	user: User;

	constructor(private mdIconRegistry: MdIconRegistry,
		private authService: AuthService,
		private router: Router) {
		mdIconRegistry.registerFontClassAlias('fa', 'fa');
	}

	closeSidebar() {
		this.sidebar.toggle();
	}

	logout() {
		this.authService.logout();
		this.sidebar.close();
		this.router.navigate(['/login']);
	}

	isLoggedIn() {
		return this.authService.isLoggedIn();
	}
}
