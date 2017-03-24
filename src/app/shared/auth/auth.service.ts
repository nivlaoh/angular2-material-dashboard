import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { AuthHttp, JwtHelper } from 'angular2-jwt';
import { LocalStorageService } from 'ng2-webstorage';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

import { environment } from '../../../environments/environment';
import { User } from '../user/user';

declare var localStorage: any;

@Injectable()
export class AuthService {
	jwtHelper: JwtHelper;
	redirectUrl: string;
	private currentUser: User;

	constructor(private http: Http,
		private localStorage: LocalStorageService,
		private authHttp: AuthHttp) {
		this.jwtHelper = new JwtHelper();
		this.init();
	}

	init() {
    	// let token = localStorage.getItem('id_token');
    	let token = this.localStorage.retrieve('id_token');
    	
    	//if (typeof token !== 'undefined' && !this.jwtHelper.isTokenExpired(token)) {
    	if (token !== null && !this.jwtHelper.isTokenExpired(token)) {
    		let user = this.jwtHelper.decodeToken(token);
    		this.currentUser = new User(user.username, user.name, user.roles);
    	}
	}

	login(username: string, password: string) {
		let headers = new Headers();
		headers.append('Authorization','Basic '+btoa(`${username}:${password}`));
  		// return this.http.post(environment.API_HOST+'/auth/login', {username: username, password: pin})
  		// 	.map(data => data.json());

  		return this.http.get('/assets/users.json')
			.map(res => res.json())
			.map(users => {
				let found = false;
				let mockToken: string = '';
				for (let i=0; i<users.length; i++) {
					if (users[i].username === username && users[i].password === password) {
						found = true;
						mockToken = users[i].token;
					}
        		}
				if (found) {
					//this._isLoggedIn = true;
					// mock login token
					// localStorage.setItem('id_token', mockToken);
					this.localStorage.store('id_token', mockToken);

					// unmarshall dummy token to currentUser object
					this.currentUser = this.convertPayloadToUser(this.jwtHelper.decodeToken(mockToken));
					console.log(this.jwtHelper.getTokenExpirationDate(mockToken));
	          
					return mockToken;
				}
				else {
					throw new Error('Invalid user');
				}
			})
			.catch(this.handleError);
	}

	logout(): boolean {
  		// localStorage.removeItem('id_token');
  		this.localStorage.clear('id_token');
    	//this._isLoggedIn = false;
		return true;
	}

	isLoggedIn(): boolean {
		// let token = localStorage.getItem('id_token');
		let token = this.localStorage.retrieve('id_token');
		if (token !== null)
			console.log('token expiry', this.jwtHelper.getTokenExpirationDate(token));

		//if (typeof token !== 'undefined' && !this.jwtHelper.isTokenExpired(token)) {
		if (token !== null && !this.jwtHelper.isTokenExpired(token)) {
			this.currentUser = this.convertPayloadToUser(this.jwtHelper.decodeToken(token));
			return true;
		}
		return false;
	}

	deleteAccount(): Observable<boolean> {
    	return this.authHttp.delete(`${environment.API_HOST}/auth/deregister`)
			.map(res => res.json())
			.map(res => {
				return this.logout();
			})
			.catch(this.handleError);
  }

	getCurrentUser(): Observable<User> {
		return Observable.of(this.currentUser);
	}

	convertPayloadToUser(payload: any) {
	    let user: User = new User();
	    user.firstName = payload.firstname;
	    user.lastName = payload.lastname;
	    user.email = payload.email;
	    user.name = payload.name;
	    user.user = payload.sub;
	    user.roles = payload.roles;
	    return user;
	}

	private handleError(error: any) {
    	let errMsg = typeof error === 'string' ? error : (error.message) ? error.message :
        	error.status ? `${error.status} - ${error.statusText}` : `Unable to connect to service: Auth`;
    	console.error(errMsg);
    	return Observable.throw(errMsg);
	}

}
