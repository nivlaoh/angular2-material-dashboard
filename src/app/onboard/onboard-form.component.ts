import { Component, ElementRef, HostBinding, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MdDialog, MdDialogRef, MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';

import { ReferenceService } from './reference.service';
import { User } from '../shared/user/user';
import { UserService } from '../shared/user/user.service';
import { routerTransition } from '../router.animations';

@Component({
	selector: 'app-onboard-form',
	templateUrl: 'onboard-form.component.html',
	styleUrls: ['onboard.component.scss'],
	animations: [routerTransition()]
})
export class OnboardFormComponent implements OnInit, OnDestroy {
	countries: any[];
	sources = [
		{
			code: 'newspaper',
			description: 'Newspaper'
		},
		{
			code: 'advertisement',
			description: 'Advertisement'
		}
	];
	signature: string;
	profilePhoto: string;
	userForm: FormGroup;
	users: any[];

	routeSub: any;
	refSub: any;

	@HostBinding('@routerTransition') transition = '';
	@ViewChild(SignaturePad) signaturePad: SignaturePad;
	private signaturePadOptions: Object = {
    	'minWidth': 1,
    	'canvasWidth': 200,
    	'canvasHeight': 150
	};

	constructor(private route: ActivatedRoute,
		private router: Router,
		private element: ElementRef,
		public dialog: MdDialog,
		public snackBar: MdSnackBar,
		public refService: ReferenceService,
		public userService: UserService) {
		this.userForm = new FormGroup({
			nric: new FormControl('', Validators.minLength(9)),
			firstName: new FormControl('', Validators.required),
			middleName: new FormControl(),
			lastName: new FormControl('', Validators.required),
			email: new FormControl('', Validators.required),
			gender: new FormControl('', Validators.required),
			isStaff: new FormControl(),
			staffPin: new FormControl(),
			source: new FormControl(),
			address: new FormControl('', [Validators.required, Validators.minLength(3)]),
			country: new FormControl('', Validators.required),
			signature: new FormControl('', Validators.required),
			profilePhoto: new FormControl('', Validators.required)
		});
		this.userForm.controls['isStaff'].valueChanges.subscribe((newVal: boolean) => {
			this.togglePinField(newVal);
		});
	}

	ngOnInit() {
		console.log(this.route.snapshot.data);

		this.refSub = this.refService.getAllCountries().subscribe(data => {
			// console.log(data);
			this.countries = data;
		}, this.handleError);

		this.routeSub = this.route.params.subscribe((params: {nric: string, name: string}) => {
			if (params.nric) {
				this.userForm.patchValue({
					nric: params.nric
				});
				this.userService.searchUserByNric(params.nric).subscribe(user => {
					console.log('user', user);
					this.patchValue(user);
				}, innerError => this.handleError(innerError));
			} else {
				this.userForm.patchValue({
					name: params.name
				});
				this.userService.searchUserByName(params.name).subscribe(user => {
					console.log('user', user);
					this.patchValue(user);
				}, innerError => this.handleError(innerError));
			}
		}, error => this.handleError(error));
	}

	ngOnDestroy() {
		this.routeSub.unsubscribe();
		this.refSub.unsubscribe();
	}

	handleError(e: any) {
		const text = typeof e === 'string' ? e : (e.error ? e.error : 'Error occurred!');
		const config = new MdSnackBarConfig();
		config.duration = 3000;
		console.log('Error', e);
		const errorPrompt = this.snackBar.open(text, 'Done', config);
	}

	private patchValue(user: User) {
		if (user !== undefined) {
			this.userForm.patchValue({
				nric: user.nric,
				firstName: user.firstName,
				middleName: user.middleName,
				lastName: user.lastName,
				email: user.email,
				gender: user.gender,
				isStaff: user.isStaff,
				staffPin: user.staffPin,
				address: user.address,
				country: user.country
			});
		}
	}

	private formToUser() {
		const user = new User();
		user.firstName = this.userForm.controls['firstName'].value;
		user.lastName = this.userForm.controls['lastName'].value;
		user.name = user.firstName + ' ' + user.lastName;
		user.nric = this.userForm.controls['nric'].value;
		user.isStaff = this.userForm.controls['isStaff'].value;
		user.staffPin = this.userForm.controls['staffPin'].value;
		user.address = this.userForm.controls['address'].value;
		user.country = this.userForm.controls['country'].value;
		user.gender = this.userForm.controls['gender'].value;
		user.profilePhoto = this.profilePhoto;
		user.signature = this.userForm.controls['signature'].value;
		return user;
	}

	private showCam() {
		const dialogRef = this.dialog.open(PhotoDialog);
		dialogRef.afterClosed().subscribe(result => {
			// console.log('photo', result);
			this.profilePhoto = result;
		});
	}

	private resetPhoto() {
		const canvas = this.element.nativeElement.querySelector('#photoCanvas');
		canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
	}

	clearSignature() {
		this.signaturePad.clear();
	}

	getSignature() {
		this.signature = this.signaturePad.toDataURL();
		this.userForm.patchValue({
			'signature': this.signature
		});
		console.log('signature', this.signature);
	}

	restoreSignature() {
		// this.signaturePad.fromDataURL(this.signature);
		// manual method of restoring
		const image = new Image();
		this.signaturePad.clear();
		image.src = this.signature;
		image.onload = () => {
    		const signatureCanvas = this.element.nativeElement.querySelector('#signature canvas');
    		const width = signatureCanvas.clientWidth;
    		const height = signatureCanvas.clientHeight;
    		signatureCanvas.getContext('2d').drawImage(image, 0, 0, width, height);
		};
		// this.signaturePad._isEmpty = false;
	}

    createUser(form: FormGroup) {
    	window.event.preventDefault();
    	const formval = form.value;
    	console.log('create user', formval);
    	// extract signature
		this.getSignature();
		console.log('pin', this.userForm.controls['staffPin'].value);
		if (this.userForm.controls['isStaff'].value && typeof this.userForm.controls['staffPin'].value === 'undefined') {
			this.userForm.controls['staffPin'].setValidators([Validators.required]);
		} else {
			this.userForm.controls['staffPin'].clearValidators();
		}
		this.userForm.controls['staffPin'].updateValueAndValidity();
		this.userForm.patchValue({
			signature: this.signature,
			profilePhoto: this.profilePhoto
		});
		// form model
    	if (this.userForm.valid) {
	    	const user = this.formToUser();
	    	this.userService.setCurrentEditUser(user);
	    	this.router.navigate(['/verify']);
	    } else {
	    	this.handleError('Some fields are not filled up');
	    }
    }

    resetForm() {
    	this.clearSignature();
    	this.resetPhoto();
    	this.userForm.reset();
    }

    togglePinField(newVal: boolean) {
    	const c = this.userForm.get('staffPin');
    	if (newVal) {
    		c.enable();
    	} else {
    		c.disable();
    	}
    }
}

@Component({
	selector: 'photo-dialog',
	templateUrl: 'photo-dialog.html',
	styleUrls: ['onboard.component.scss']
})
export class PhotoDialog implements OnInit {
	public videosrc: any;
	private videoStream: any;

	constructor(private element: ElementRef,
		private sanitizer: DomSanitizer,
		public dialogRef: MdDialogRef<PhotoDialog>) {}

	ngOnInit() {
		this.showCam();
	}

	private showCam() {
		if (!this.videoStream) {
	        // 1. Casting necessary because TypeScript doesn't
	        // know object Type 'navigator';
	        const nav = <any>navigator;

	        // 2. Adjust for all browsers
	        nav.getUserMedia = nav.getUserMedia || nav.mozGetUserMedia || nav.webkitGetUserMedia;

	        // 3. Trigger lifecycle tick (ugly, but works - see (better) Promise example below)
	        // setTimeout(() => { }, 100);

	        // 4. Get stream from webcam
	        nav.getUserMedia({video: true}, (stream) => {
	            const webcamUrl = URL.createObjectURL(stream);
	            this.videoStream = stream;

	            // 4a. Tell Angular the stream comes from a trusted source
	            this.videosrc = this.sanitizer.bypassSecurityTrustUrl(webcamUrl);

	            // 4b. Start video element to stream automatically from webcam.
	            this.element.nativeElement.querySelector('video').autoplay = true;
	            // this.element.nativeElement.querySelector('video').play();
	        }, (err) => console.log(err));
    	} else {
    		this.stopCam();
    	}
    }

    private stopCam() {
		this.element.nativeElement.querySelector('video').pause();
		this.element.nativeElement.querySelector('video').src = '';
		this.videoStream.getTracks()[0].stop();
		this.videoStream = null;
		this.dialogRef.close();
	}

    private takePhoto() {
		const video = this.element.nativeElement.querySelector('video');
		video.pause();
		this.videoStream.getTracks()[0].stop();
		this.videoStream = null;

		const canvas: any = document.getElementById('photoCanvas');
		canvas.getContext('2d').drawImage(video, 0, 0, 300, 150);
		const img = canvas.toDataURL('image/png');

		this.dialogRef.close(img);
	}
}