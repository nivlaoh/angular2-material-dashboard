import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../environments/environment';
import { Customer, User } from './user';

@Injectable()
export class UserService {
  currentEditUser: User;
  apiPort: string = '9086';

  constructor(private http: Http) { }

  searchUserByNric(searchString: string) {
  	return this.http.get('/assets/users.json')
  		.map(data => data.json())
      .map((users: User[]) => users.find(u => u.nric === searchString))
      .catch(this.handleError);
  }

  searchUserByName(searchString: string) {
    // return this.http.get('/assets/users.json')
    return this.http.get(`${environment.API_HOST}:${this.apiPort}/customer`)
      .map(data => data.json())
      .map((users: User[]) => users.find(u =>
        u.firstName.indexOf(searchString) !== -1 ||
        u.middleName.indexOf(searchString) !== -1 ||
        u.lastName.indexOf(searchString) !== -1
      ))
      .catch(this.handleError);
  }

  searchUsers(searchString: string) {
  	// return this.http.get('/assets/users.json')
    return this.http.get(`${environment.API_HOST}:${this.apiPort}/customer`)
  		.map(data => data.json())
      .map((users: Customer[]) => users.filter(user => {
        console.log('user', user);
        return user.firstName.toLowerCase().indexOf(searchString) != -1;
      }))
      .catch(this.handleError);
  }

  setCurrentEditUser(user: User) {
    this.currentEditUser = user;
  }

  saveUser(user: any) {
  	return this.http.post(`${environment.API_HOST}:${this.apiPort}/customer`, user)
  		.map(data => data.json())
      .catch(this.handleError);
  }

  handleError(error: any) {
    let msg = typeof error === 'string' ? error : error.message ? error.message : 'Error occurred'; 
    return Observable.throw(msg);
  }

}
