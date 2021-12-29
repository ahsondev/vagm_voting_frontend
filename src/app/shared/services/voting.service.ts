import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators'
import { StorageService } from './storage.service';

@Injectable({
     providedIn: 'root'
})
export class VotingService extends BaseService{

     private code : string;
     private token : string;

     constructor(
          protected _http: HttpClient,
          protected _storageService : StorageService
     ) { 
          super();
          this.token = this._storageService.getAuthToken();
          this.code = this._storageService.getMeetingCode();
     }

     public validateCode() {
          let url = this.apiUrl + 'webinarDetails?code=' + this.code;
          let options = {
               headers : new HttpHeaders(
                    {
                         'Authorization' : 'Bearer ' + this.token
                    }
               )
          };
          return this._http.get(url, options).pipe(
               map(this.handleMap),
               catchError(this.handleError)
          );
     }

     public toggleChat(data) {
          return this._http.post(this.chatApiURL, data).pipe(
               map(this.handleMap),
               catchError(this.handleError)
          );
     }

}
