import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from './base.service';
import { map, catchError } from 'rxjs/operators'

@Injectable({
     providedIn: 'root'
})
export class UserService extends BaseService {

     constructor(
          protected _http: HttpClient
     ) { 
          super();
     }

     public getUserDetails(data) {
          let url = this.authURL + 'login';
          return this._http.post(url, data).pipe(
               map(this.handleMap),
               catchError(this.handleError)
          );
     }

     public verifyOtp(data) {
          let url = this.authURL + 'verify_otp';
          return this._http.post(url, data).pipe(
               map(this.handleMap),
               catchError(this.handleError)
          );
     }
}
