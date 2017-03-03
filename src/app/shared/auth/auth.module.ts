import { NgModule } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { AuthConfig, AuthHttp } from 'angular2-jwt';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig(), http, options);
}

@NgModule({
  imports: [
  ],
  declarations: [],
  providers: [
  	{
  		provide: AuthHttp,
  		useFactory: authHttpServiceFactory,
  		deps: [Http, RequestOptions]
  	}
  ]
})
export class AuthModule { }
