import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';

import { routerTransition } from '../router.animations';
import { AuthService } from '../shared/auth/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()],
    host: { '[@routerTransition]': '' }
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup

    constructor(private authService: AuthService,
        private router: Router,
        private snackBar: MdSnackBar) {

        this.loginForm = new FormGroup({
            username: new FormControl(),
            password: new FormControl()
        });
    }

    ngOnInit() {
    }

    login() {
        let username = this.loginForm.controls['username'].value;
        let password = this.loginForm.controls['password'].value;

        this.authService.login(username, password).subscribe(data => {
            console.log(data);
            this.router.navigate(['/home']);
        }, error => this.handleError(error));
    }

    logout() {
  	    this.authService.logout();
    }

    handleError(e: any) {
        let text = typeof e === 'string' ? e : (e.error ? e.error : 'Error occurred!');
        let config = new MdSnackBarConfig();
        config.duration = 3000;
        console.log('here...?', e);
        let errorPrompt = this.snackBar.open(text, 'Done', config);
    }

}
