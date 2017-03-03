import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/debounceTime';

import { routerTransition } from '../router.animations';
import { Customer, User } from '../shared/user/user';
import { UserService } from '../shared/user/user.service';

@Component({
	selector: 'app-onboard',
	templateUrl: './onboard.component.html',
	styleUrls: ['./onboard.component.scss'],
	animations: [routerTransition()]
})
export class OnboardComponent implements OnInit, OnDestroy {
	entryField: string;
	isLoading: boolean;
	navigatePage: boolean;
	users: Customer[] = [];
	formControl: FormControl = new FormControl();
	userForm: FormGroup;
	userSubRef: Subscription;

	@HostBinding('@routerTransition') binding = '';

	constructor(private router: Router, private userService: UserService) {
		this.userForm = new FormGroup({
			searchField: new FormControl()
		});
		this.userForm.controls['searchField'].valueChanges
			.debounceTime(300)
			.subscribe(newVal => {
				this.entryField = newVal;
				if (this.entryField.length >= 2)
					this.checkEntry(newVal);
			});
	}

	ngOnInit() {
	}

	ngOnDestroy() {
		if (this.userSubRef)
			this.userSubRef.unsubscribe();
	}

	goCustomerPage() {
		this.navigatePage = true;
		this.checkEntry(this.entryField);
	}

	checkEntry(data: string) {
		this.isLoading = true;
		if (this.isValidNRIC(data)) {
			this.router.navigate(['/onboard/new', { nric: data }]);
		} else {
			this.userSubRef = this.userService.searchUsers(data).subscribe(data => {
				this.users = data;
				this.isLoading = false;
			});
	  	}
	}

	isValidNRIC(data: string) {
		if (typeof data === 'undefined') return false;
		const digitWeights: number[] = [2, 7, 6, 5, 4, 3, 2];
		const charMap: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'Z', 'J'];
		let checkSum = 0;
		for (let i = 0; i < data.length - 2; i++) {
			checkSum += +data[i + 1] * digitWeights[i];
		}
		// divide result by 11
		checkSum %= 11;
		// get check digit
		checkSum = 11 - checkSum;
		// check character
		/*if (charMap[checkSum-1] == data[8]) {
			return true;
		} else return false;*/
		// mock nric check
		if (data[0] === 'S' && charMap.indexOf(data[8]) != -1) {
			return true;
		} else return false;
	}

}
