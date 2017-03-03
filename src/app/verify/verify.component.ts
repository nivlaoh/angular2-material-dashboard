import { Component, ElementRef, HostBinding, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';

import { routerTransition } from '../router.animations';

import { User } from '../shared/user/user';
import { UserService } from '../shared/user/user.service';

@Component({
	selector: 'app-verify',
	templateUrl: './verify.component.html',
	styleUrls: ['./verify.component.scss'],
	animations: [routerTransition()]
})
export class VerifyComponent implements OnInit {
	currentTimestamp: string;
	user: User;
	imgWidth: number;
	imgHeight: number;

	@HostBinding('@routerTransition') binding = '';
	@ViewChild(SignaturePad) signaturePad: SignaturePad;
	private signaturePadOptions: Object = {
    	'minWidth': 1,
    	'canvasWidth': 200,
    	'canvasHeight': 150
	};

	constructor(private userService: UserService,
		private element: ElementRef,
		private snackBar: MdSnackBar,
		private location: Location,
		private router: Router) { }

	ngOnInit() {
		this.currentTimestamp = new Date().toUTCString();
		this.user = this.userService.currentEditUser;
		if (typeof this.user === 'undefined') {
			this.router.navigate(['/onboard']);
		} else {
			const img = new Image();
			img.src = this.user.profilePhoto;
			img.onload = () => {
				this.imgWidth = img.width;
				this.imgHeight = img.height;
				console.log(this.imgWidth, this.imgHeight);
			};
		}

		setTimeout(() => {
			this.restoreSignature();
			this.signaturePad.off();
		}, 0);
	}

	restoreSignature() {
		//this.signaturePad.fromDataURL(this.signature);
		// manual method of restoring
		if (this.user) {
			var image = new Image();
			this.signaturePad.clear();
			image.src = this.user.signature;
			image.onload = () => {
	    		let signatureCanvas = this.element.nativeElement.querySelector('#signature canvas');
	    		let width = signatureCanvas.clientWidth;
	    		let height = signatureCanvas.clientHeight;
	    		signatureCanvas.getContext('2d').drawImage(image, 0, 0, width, height);
			};
		}
	}

	saveUser() {
		this.userService.saveUser(this.user).subscribe(response => {
			console.log('save result', response);
		}, error => this.handleError(error));
	}

	amend() {
		this.location.back();
	}

	handleError(e: any) {
		let text = typeof e === 'string' ? e : (e.error ? e.error : 'Error occurred!');
		let config = new MdSnackBarConfig();
		config.duration = 3000;
		console.log('Error', e);
		let errorPrompt = this.snackBar.open(text, 'Done', config);
	}

}
