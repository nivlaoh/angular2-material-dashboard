import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class ReferenceService {

	constructor(private http: Http) { }

	getAllCountries() {
		return this.http.get('http://restcountries.eu/rest/v2/all').map(data => data.json());
	}

}
